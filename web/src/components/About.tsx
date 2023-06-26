import Image from "next/image";

import img2 from "../assets/casa.png";
import { BsCheckCircleFill } from "react-icons/bs";

export function About() {
  return (
    <div className="flex flex-col mt-24">
      <div className="flex flex-col md:flex-row">
        
        {/* Primeira coluna */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h1 className="text-4xl mb-4 text-center font-bold">Sobre nós</h1>
          <div className="text-justify text-gray-500">
            <p>
              +SuaVida é uma nova maneira de marcar sua cotações de seguro de
              saúde. Oferecemos ferramentas semelhantes às fornecidos por
              seguradoras gratuitamente e os preços são baseados em doações e
              não redes restritivas de planos de saúde. Os preços são baseados
              em doações e não redes restritivas de planos de saúde.
            </p>
            <p>
              +SuaVida é uma nova maneira de marcar sua cotações de seguro de
              saúde. Oferecemos ferramentas semelhantes às fornecidos por
              seguradoras gratuitamente e os preços são baseados em doações e
              não redes restritivas de planos de saúde. Os preços são baseados
              em doações e não redes restritivas de planos de saúde.
            </p>
            <p>
              +SuaVida é uma nova maneira de marcar sua cotações de seguro de
              saúde. Oferecemos ferramentas semelhantes às fornecidos por
              seguradoras gratuitamente e os preços são baseados em doações e
              não redes restritivas de planos de saúde. Os preços são baseados
              em doações e não redes restritivas de planos de saúde.
            </p>
            <p>
              +SuaVida é uma nova maneira de marcar sua cotações de seguro de
              saúde. Oferecemos ferramentas semelhantes às fornecidos por
              seguradoras gratuitamente e os preços são baseados em doações e
              não redes restritivas de planos de saúde. Os preços são baseados
              em doações e não redes restritivas de planos de saúde.
            </p>
          </div>
          <div className="flex justify-between mt-4 font-semibold text-sm md:text-base">
            <div className="flex flex-col">
              <span className="flex mb-6">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Análise de dados
              </span>
              <span className="flex mb-6 font-semibold">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Redução de não comparências
              </span>
              <span className="flex mb-6 font-semibold">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Maior acessibilidade
              </span>
            </div>
            <div className="flex flex-col">
              <span className="flex mb-6 font-semibold">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Conveniência
              </span>{" "}
              <span className="flex mb-6 font-semibold">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Economia de tempo
              </span>{" "}
              <span className="flex mb-6 font-semibold">
                <BsCheckCircleFill
                  size={26}
                  color="#0079FF"
                  className="mx-1 md:mx-4"
                />
                Comunicação aprimorada
              </span>
            </div>
          </div>
        </div>

        {/* Segunda coluna */}
        <div className="w-full md:w-1/2">
          <Image
            src={img2}
            alt="Descrição da imagem"
            className="object-cover h-full w-full p-6"
          />
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:justify-center p-6">
        <div className="flex flex-col items-center mx-7">
          <span className="text-5xl font-bold text-primary">15k</span>
          <span className="mt-2 font-bold">Clínicas Satisfeitas</span>
        </div>
        <div className="flex flex-col items-center mx-7">
          <span className="text-5xl font-bold text-primary">150</span>
          <span className="mt-2 font-bold">Pacientes Mensais</span>
        </div>
        <div className="flex flex-col items-center mx-7">
          <span className="text-5xl font-bold text-primary">15</span>
          <span className="mt-2 font-bold">Cidades Presentes</span>
        </div>
        <div className="flex flex-col items-center mx-7">
          <span className="text-5xl font-bold text-primary">10+</span>
          <span className="mt-2 font-bold">Convênios</span>
        </div>
      </div>
    </div>
  );
}
