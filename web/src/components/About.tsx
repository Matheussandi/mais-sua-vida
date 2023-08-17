import Image from "next/image";

import img2 from "../assets/casa.png";
import { BsCheckCircleFill } from "react-icons/bs";

export function About() {
  return (
    <section id="about">
      <div className="mt-24 flex flex-col">
        <div className="flex flex-col md:flex-row">
          {/* Primeira coluna */}
          <div className="flex w-full flex-col justify-center p-4 md:w-1/2">
            <h1 className="mb-4 text-center text-4xl font-bold">Sobre nós</h1>
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
            <div className="mt-4 flex justify-between text-sm font-semibold md:text-base">
              <div className="flex flex-col">
                <span className="mb-6 flex">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mx-1 md:mx-4"
                  />
                  Análise de dados
                </span>
                <span className="mb-6 flex font-semibold">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mx-1 md:mx-4"
                  />
                  Redução de não comparências
                </span>
                <span className="mb-6 flex font-semibold">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mx-1 md:mx-4"
                  />
                  Maior acessibilidade
                </span>
              </div>
              <div className="flex flex-col">
                <span className="mb-6 flex font-semibold">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mx-1 md:mx-4"
                  />
                  Conveniência
                </span>{" "}
                <span className="mb-6 flex font-semibold">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mx-1 md:mx-4"
                  />
                  Economia de tempo
                </span>{" "}
                <span className="mb-6 flex font-semibold">
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
              className="h-full w-full object-cover p-6"
            />
          </div>
        </div>

        <div className="flex flex-col items-center p-6 sm:flex-row sm:justify-center">
          <div className="mx-7 flex flex-col items-center">
            <span className="text-5xl font-bold text-primary">15k</span>
            <span className="mt-2 font-bold">Clínicas Satisfeitas</span>
          </div>
          <div className="mx-7 flex flex-col items-center">
            <span className="text-5xl font-bold text-primary">150</span>
            <span className="mt-2 font-bold">Pacientes Mensais</span>
          </div>
          <div className="mx-7 flex flex-col items-center">
            <span className="text-5xl font-bold text-primary">15</span>
            <span className="mt-2 font-bold">Cidades Presentes</span>
          </div>
          <div className="mx-7 flex flex-col items-center">
            <span className="text-5xl font-bold text-primary">10+</span>
            <span className="mt-2 font-bold">Convênios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
