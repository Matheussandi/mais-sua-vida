"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginClinic() {
  const [CNPJ, setCNPJ] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post("/clinica/login", { CNPJ, senha });

      if (response.status === 200) {
        // Autenticação bem-sucedida, redirecione para a página desejada
        const clinic = response.data.Clinic;
        console.log("Autenticação bem-sucedida");
        router.push(`/clinic/${clinic.id}`);
      } else {
        // Autenticação falhou, exiba uma mensagem de erro
        throw new Error("Erro durante a autenticação");
      }
    } catch (error) {
      // Lidar com erros de autenticação ou chamada à API
      console.error("Erro durante a autenticação:", error);
      setError(
        "CNPJ ou senha incorretos. Por favor, verifique suas credenciais."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Clínica</h1>
      <p className="my-10 text-sm text-gray-600">
        Acesse a plataforma inserindo suas credenciais
      </p>
      <form className="w-full max-w-sm">
        <div className={`mb-4 ${error ? "border-red-500" : ""}`}>
          <input
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            id="CNPJ"
            type="text"
            placeholder="CNPJ"
            value={CNPJ}
            onChange={(e) => setCNPJ(e.target.value)}
          />
          <input
            className={`focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            id="senha"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded bg-primary px-4 py-2 text-white transition duration-300 hover:bg-blue-500"
            type="button"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <Link
            className="inline-block align-baseline text-sm font-bold text-primary hover:text-blue-500"
            href="/"
          >
            Sair
          </Link>
        </div>
      </form>
    </div>
  );
}
