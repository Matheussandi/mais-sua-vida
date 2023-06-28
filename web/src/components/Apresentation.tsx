import Image from "next/image";

import DoisMedicos from "../assets/twodoctors.png";
import HomeFooter from "../assets/home.svg";

export function Apresentation() {
  return (
    <>
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 gap-4 relative z-10">
        {/* Conteúdo da primeira coluna */}
        <div>
          <h1 className="text-2xl md:text-5xl font-bold">
            Simplifique, organize e gerencie as{" "}
            <span className="text-primary">consultas</span>
          </h1>
          <p className="text-sm mt-6 text-justify text-gray-500">
            +SuaVida é uma nova maneira de marcar sua cotações de seguro de
            saúde. Oferecemos ferramentas semelhantes às fornecidos por
            seguradoras gratuitamente e os preços são baseados em doações e não
            redes restritivas de planos de saúde.
          </p>
          <button className="bg-primary my-7 py-4 px-9 rounded-xl text-white">
            Contato
          </button>

          <div className="flex space-x-4">
            <div className="w-24 h-48 lg:w-36 shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="rounded-full mx-auto"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Cardiologista</h3>
                <button className="bg-primary font-semibold p-2 rounded-xl text-white">
                  Agendar
                </button>
              </div>
            </div>

            <div className="w-24 h-48 lg:w-36 shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="rounded-full mx-auto"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Dematologista</h3>
                <button className="bg-primary font-semibold p-2 rounded-xl text-white">
                  Agendar
                </button>
              </div>
            </div>

            <div className="w-24 h-48 lg:w-36 shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <Image
                src={DoisMedicos}
                width={50}
                height={50}
                alt="Dois médicos juntos"
                className="rounded-full mx-auto"
              />
              <div className="text-center">
                <h3 className="font-bold">Dr. Shimanta</h3>
                <h3 className="mb-2 text-gray-500">Ortopedista</h3>
                <button className="bg-primary font-semibold p-2 rounded-xl text-white">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  Conteúdo da segunda coluna */}
        <div className="flex-grow relative z-10">
          <Image
            src={DoisMedicos}
            alt="Dois médicos juntos"
            className="h-full w-auto hidden md:block"
          />
        </div>
        {/* Exibição condicional do SVG em telas maiores */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative">
            {/* O SVG está oculto em telas de celular e tablet */}
            <Image
              src={HomeFooter}
              className="object-cover w-full h-full hidden lg:block"
              alt="footer home"
            />
          </div>
        </div>
      </div>
    </>
  );
}
