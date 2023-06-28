import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Você é?</h1>
      <div className="flex space-x-4">
        <Link
          href="login/doctor"
          className="bg-primary my-7 py-4 px-9 rounded-xl text-white font-bold"
        >
          Médico
        </Link>
        <Link
          href="login/clinic"
          className="bg-primary my-7 py-4 px-9 rounded-xl text-white font-bold"
        >
          Clínica
        </Link>
      </div>
    </div>
  );
}
