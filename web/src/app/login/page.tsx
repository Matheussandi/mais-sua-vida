import Link from "next/link";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Você é?</h1>
      <div className="flex space-x-4">
        <Link
          href="login/doctor"
          className="my-7 rounded-xl bg-primary px-9 py-4 font-bold text-white"
        >
          Médico
        </Link>
        <Link
          href="login/clinic"
          className="my-7 rounded-xl bg-primary px-9 py-4 font-bold text-white"
        >
          Clínica
        </Link>
      </div>
    </div>
  );
}
