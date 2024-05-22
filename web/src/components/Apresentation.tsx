import Image from "next/image";
import Doctor from "../assets/Doctors-pana.svg";

export function Apresentation() {
  return (
    <>
      <div className="relative z-10 flex flex-col md:flex-row gap-4 md:space-x-4">
        {/* Conteúdo da primeira coluna */}
        <div className="mt-6 md:my-52 md:w-1/2">
          <h1 className="text-2xl font-bold md:text-5xl">
            Simplifique, organize e gerencie as{" "}
            <span className="text-primary">consultas</span>
          </h1>
          <p className="mt-6 text-justify text-sm text-gray-500">
            +SuaVida simplifica o agendamento e gerenciamento de consultas
            médicas, colocando o controle nas suas mãos. Nosso compromisso é
            tornar o processo fácil, eficiente e acessível para todos -
            pacientes e clínicas. Com nossa plataforma, agendar consultas nunca
            foi tão simples e conveniente.
          </p>
        </div>

        {/*  Conteúdo da segunda coluna */}
        <div className="relative z-10 flex md:w-1/2">
          <div className="relative h-full w-full content-center">
            <Image
              src={Doctor}
              alt="Dois médicos juntos"
              className="h-auto w-auto object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}