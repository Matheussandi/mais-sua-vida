"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IClinic {
  id: string;
}

export default function LoginClinic() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.get<IClinic[]>("/clinica");

      const clinics = response.data; // Array de clínicas retornados pela API

      const clinicFound = clinics.find((clinic) => clinic.id === id);

      if (clinicFound) {
        // Autenticação bem-sucedida, redirecione para a página desejada
        console.log("Autenticação bem-sucedida");
        // Redirecione para a página desejada usando o router do Next.js

        // Exemplo: router.push("/dashboard");
        router.push(`/clinic/${clinicFound.id}`);
      } else {
        // Autenticação falhou, exiba uma mensagem de erro
        setError("Credenciais inválidas. Por favor, verifique seu ID.");
      }
    } catch (error) {
      // Lidar com erros de chamada à API
      console.error("Erro durante a autenticação:", error);
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
            id="id"
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded bg-primary px-4 py-2  text-white transition duration-300 hover:bg-blue-500"
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
