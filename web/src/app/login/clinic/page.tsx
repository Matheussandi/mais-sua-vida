"use client"

import { useState } from "react";
import axios from "axios";

interface IClinic {
  email: string;
  // Adicione outros campos necessários do objeto médico
}

export default function LoginClinic() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get<IClinic[]>(
        "http://localhost:3333/clinica"
      );

      const clinics = response.data; // Array de médicos retornados pela API

      const clinicFound = clinics.find((clinic) => clinic.email === email);

      if (clinicFound) {
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Clínica</h1>
      <p className="my-10 text-sm text-gray-600">
        Acesse a plataforma inserindo suas credenciais
      </p>
      <form className="w-full max-w-sm">
        <div className={`mb-4 ${error ? "border-red-500" : ""}`}>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-primary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            type="button"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-primary hover:text-blue-500"
            href="#"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </form>
    </div>
  );
}
