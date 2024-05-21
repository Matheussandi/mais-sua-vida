import Image from "next/image";

import doc1 from "../assets/doc-1.webp";
import doc2 from "../assets/doc-2.webp";
import doc3 from "../assets/doc-3.webp";

import DoisMedicos from "../assets/twodoctors.webp";

import Link from "next/link";

export function Apresentation() {
  return (
    <>
      <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 space-x-4">
        {/* Conteúdo da primeira coluna */}
        <div className="mt-6 md:mt-52">
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
          <Link href="#footer">
            <button className="my-7 rounded-xl bg-primary px-9 py-4 font-bold text-white">
              Contato
            </button>
          </Link>

          <div className="flex space-x-4">
            <div className="h-48 w-32 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg md:w-36">
              <Image
                src={doc1}
                width={500}
                height={500}
                alt="Imagem de uma médica"
                objectFit="cover"
                className="mx-auto rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="font-bold">Dr. Luiza</h3>
                <h3 className="mb-2 text-gray-500">Dematologista</h3>
              </div>
            </div>

            <div className="h-48 w-32 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg md:w-36">
              <Image
                src={doc2}
                width={500}
                height={500}
                alt="Imagem de um médico"
                className="mx-auto rounded-lg"
                quality={100}
              />
              <div className="text-center mt-4">
                <h3 className="font-bold">Dr. Miguel</h3>
                <h3 className="mb-2 text-gray-500">Ortopedista</h3>
              </div>
            </div>

            <div className="h-48 w-32 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg md:w-36">
              <Image
                src={doc3}
                width={500}
                height={500}
                alt="Imagem de uma médica"
                className="mx-auto rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="font-bold">Dr. Maria</h3>
                <h3 className="mb-2 text-gray-500">Cardiologista</h3>
              </div>
            </div>
          </div>
        </div>

        {/*  Conteúdo da segunda coluna */}
        <div className="relative z-10 flex-grow flex content-center">
          <div className="relative h-full w-full">
            <Image
              src={DoisMedicos}
              alt="Dois médicos juntos"
              fill
              objectFit="cover"
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
