import Image from "next/image";

import { BsCheckCircleFill } from "react-icons/bs";

import Search from "../assets/search.png";
import Phone from "../assets/phone.png";
import Profile from "../assets/profile.png";
import Calender from "../assets/calendar.png";
import Star from "../assets/star.png";

export function Patients() {
  return (
    <section id="patients">
      <div className="mt-16 flex flex-col items-center">
        <h2 className="mb-8 text-2xl font-bold text-primary">Para pacientes</h2>
        <h2 className="mb-12 text-5xl font-bold">
          Passo a passo para obter sua solução
        </h2>
        <div className="flex flex-wrap">
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <div className="card h-full rounded-b-lg border-t-4 border-primary p-8 shadow-lg hover:shadow-xl sm:p-14">
              <Image
                src={Search}
                alt="Imagem do card"
                className="h-auto w-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-bold sm:text-xl">
                Procure o médico desejado
              </h3>
              <p className="mt-2 text-gray-600">
                Busque pela clínica ou especialista desejado.
              </p>
            </div>
          </div>
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <div className="card h-full rounded-b-lg border-t-4 border-primary p-8 shadow-lg hover:shadow-xl sm:p-14">
              <Image
                src={Profile}
                alt="Imagem do card"
                className="h-auto w-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-bold sm:text-xl">
                Análise profissional
              </h3>
              <p className="mt-2 text-gray-600">
                Leia o perfil completo do profissional, para saber suas
                qualificações, experiências e serviços prestados.
              </p>
            </div>
          </div>
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <div className="card h-full rounded-b-lg border-t-4 border-primary p-8 shadow-lg hover:shadow-xl sm:p-14">
              <Image
                src={Calender}
                alt="Imagem do card"
                className="h-auto w-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-bold sm:text-xl">
                Realize um agendamento
              </h3>
              <p className="mt-2 text-gray-600">
                Agende sua consulta, selecionando o dia e horário. Podendo ser
                cancelada até um dia antes.
              </p>
            </div>
          </div>
          <div className="w-full p-4 sm:w-1/2 lg:w-1/4">
            <div className="card h-full rounded-b-lg border-t-4 border-primary p-8 shadow-lg hover:shadow-xl sm:p-14">
              <Image
                src={Star}
                alt="Imagem do card"
                className="h-auto w-auto object-cover"
              />
              <h3 className="mt-4 text-lg font-bold sm:text-xl">
                Dê sua avaliação
              </h3>
              <p className="text-sm text-gray-600">(Em breve)</p>
              <p className="mt-2 text-gray-600">
                Deixe uma classificação e comentário para futuros pacientes
                terem uma noção de como é a consulta.
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap">
            <div className="w-full p-4 sm:w-1/2">
              <Image
                src={Phone}
                alt="Imagem"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="w-full p-4 sm:w-1/2 lg:pr-16 lg:text-justify">
              <p className="mb-2 text-lg font-bold text-primary">Agendamento</p>
              <h1 className="mb-6 text-5xl font-bold">
                Faça um agendamento com antecedência com o médico
              </h1>
              <p className="text-gray-500">
                Agendamento de consulta costuma ser chato e às vezes irritante.
                Porém, com aplivativo +SuaVida esse processo se torna simples e
                confortável.
              </p>

              <div className="mt-7">
                <span className="my-4 flex">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mr-3"
                  />
                  Agendamento simples e confortável
                </span>
                <span className="my-4 flex">
                  <BsCheckCircleFill
                    size={26}
                    color="#0079FF"
                    className="mr-3"
                  />
                  Cancele sua consulta a qualquer momento
                </span>
              </div>

              <button className="mt-3 rounded-xl bg-primary px-9 py-4 font-bold text-white">
                Baixe o app agora!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
