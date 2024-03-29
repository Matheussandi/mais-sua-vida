"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginDoctor() {
  const [CRM, setCRM] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post("/medico/login", { CRM, senha });

      if (response.status === 200) {
        const doctor = response.data.Doctor;
        console.log("Autenticação bem-sucedida");
        router.push(`/doctor/${doctor.id}`);
      } else {
        throw new Error("Erro durante a autenticação");
      }
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      setError(
        "CRM ou senha incorretos. Por favor, verifique suas credenciais."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Médico</h1>
      <p className="my-10 text-sm text-gray-600">
        Acesse a plataforma inserindo suas credenciais
      </p>
      <form className="w-full max-w-sm">
        <div className={`mb-4 ${error ? "border-red-500" : ""}`}>
          <input
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            id="CRM"
            type="text"
            placeholder="CRM"
            value={CRM}
            onChange={(e) => setCRM(e.target.value)}
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
