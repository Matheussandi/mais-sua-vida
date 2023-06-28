"use client";

import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

interface IDoctor {
  email: string;
  // Adicione outros campos necessários do objeto médico
}

export default function LoginDoctor() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.get<IDoctor[]>("/medico");

      const doctors = response.data; // Array de médicos retornados pela API

      const doctorFound = doctors.find((doctor) => doctor.email === email);

      if (doctorFound) {
        // Autenticação bem-sucedida, redirecione para a página desejada
        console.log("Autenticação bem-sucedida");
        // Redirecione para a página desejada usando o router do Next.js
        // Exemplo: router.push("/dashboard");
      } else {
        // Autenticação falhou, exiba uma mensagem de erro
        setError("Credenciais inválidas. Por favor, verifique seu email.");
      }
    } catch (error) {
      // Lidar com erros de chamada à API
      console.error("Erro durante a autenticação:", error);
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
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
            type="button"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <a
            className="inline-block align-baseline text-sm font-bold text-primary hover:text-blue-500"
            href="#"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </form>
    </div>
  );
}
