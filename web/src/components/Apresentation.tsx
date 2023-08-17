import Image from "next/image";

import DoisMedicos from "../assets/twodoctors.png";
import HomeFooter from "../assets/home.svg";

export function Apresentation() {
  return (
    <>
      <div className="relative z-10 mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Conteúdo da primeira coluna */}
        <div>
          <h1 className="text-2xl font-bold md:text-5xl">
            Simplifique, organize e gerencie as{" "}
            <span className="text-primary">consultas</span>
          </h1>
          <p className="mt-6 text-justify text-sm text-gray-500">
            +SuaVida é uma nova maneira de marcar sua cotações de seguro de
            saúde. Oferecemos ferramentas semelhantes às fornecidos por
            seguradoras gratuitamente e os preços são baseados em doações e não
            redes restritivas de planos de saúde.
          </p>
          <button className="my-7 cursor-default rounded-xl bg-primary px-9 py-4 font-bold text-white">
            Contato
          </button>

          <div className="flex space-x-4">
            <div className="h-48 w-24 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg lg:w-36">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="mx-auto rounded-full"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Cardiologista</h3>
                <button className="cursor-default rounded-xl bg-primary px-4 py-2 text-white">
                  Agendar
                </button>
              </div>
            </div>

            <div className="h-48 w-24 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg lg:w-36">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="mx-auto rounded-full"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Dematologista</h3>
                <button className="cursor-default rounded-xl bg-primary px-4 py-2 text-white">
                  Agendar
                </button>
              </div>
            </div>

            <div className="h-48 w-24 flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg lg:w-36">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="mx-auto rounded-full"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Ortopedista</h3>
                <button className="cursor-default rounded-xl bg-primary px-4 py-2 text-white">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  Conteúdo da segunda coluna */}
        <div className="relative z-10 flex-grow">
          <Image
            src={DoisMedicos}
            alt="Dois médicos juntos"
            className="hidden h-full w-auto md:block"
          />
        </div>
        {/* Exibição condicional do SVG em telas maiores */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative">
            {/* O SVG está oculto em telas de celular e tablet */}
            <Image
              src={HomeFooter}
              className="hidden h-full w-full object-cover lg:block"
              alt="footer home"
            />
          </div>
        </div>
      </div>
    </>
  );
}
