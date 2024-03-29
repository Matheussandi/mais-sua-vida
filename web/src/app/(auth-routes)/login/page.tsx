import Link from "next/link";

export default function LoginClinic() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 text-center">
          <p className="mb-4 text-xl">Bem-vindo à nossa plataforma!</p>
          <p className="text-base">Escolha como deseja entrar:</p>
          <div className="mt-2 flex justify-center">
            <Link
              href="login/doctor"
              className="text-bold mr-2 rounded bg-primary px-8 py-2 text-white transition duration-300 hover:bg-blue-500"
            >
              Médico
            </Link>
            <Link
              href="login/clinic"
              className="rounded bg-primary px-8 py-2 text-white transition duration-300 hover:bg-blue-500"
            >
              Clínica
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
