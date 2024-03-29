"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "next-auth/react"

export default function LoginClinic() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace('/clinic')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Clínica</h1>
      <p className="my-10 text-sm text-gray-600">
        Acesse a plataforma inserindo suas credenciais
      </p>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className={`mb-4 ${error ? "border-red-500" : ""}`}>
          <input
            className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={`focus:shadow-outline mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col items-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded bg-primary px-4 py-2 text-white transition duration-300 hover:bg-blue-500"
            type="submit"
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
