import Image from "next/image";

import { BsCheckCircleFill } from "react-icons/bs";

import Search from "../assets/Search.png";
import Phone from "../assets/phone.png";
import Profile from "../assets/profile.png";
import Calender from "../assets/calendar.png";
import Star from "../assets/star.png";

export function Patients() {
  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl mb-8 text-primary font-bold">Para pacientes</h2>
      <h2 className="text-5xl mb-12 font-bold">
        Passo a passo para obter sua solução
      </h2>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <div className="card border-t-4 border-primary shadow-lg hover:shadow-xl p-8 sm:p-14 rounded-b-lg h-full">
            <Image
              src={Search}
              alt="Imagem do card"
              className="w-auto h-auto object-cover"
            />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              Procure o médico desejado
            </h3>
            <p className="text-gray-600 mt-2">
              Busque pela clínica ou especialista desejado.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <div className="card border-t-4 border-primary shadow-lg hover:shadow-xl p-8 sm:p-14 rounded-b-lg h-full">
            <Image
              src={Profile}
              alt="Imagem do card"
              className="w-auto h-auto object-cover"
            />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              Análise profissional
            </h3>
            <p className="text-gray-600 mt-2">
              Leia o perfil completo do profissional, para saber suas
              qualificações, experiências e serviços prestados.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <div className="card border-t-4 border-primary shadow-lg hover:shadow-xl p-8 sm:p-14 rounded-b-lg h-full">
            <Image
              src={Calender}
              alt="Imagem do card"
              className="w-auto h-auto object-cover"
            />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              Realize um agendamento
            </h3>
            <p className="text-gray-600 mt-2">
              Agende sua consulta, selecionando o dia e horário. Podendo ser
              cancelada até um dia antes.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <div className="card border-t-4 border-primary shadow-lg hover:shadow-xl p-8 sm:p-14 rounded-b-lg h-full">
            <Image
              src={Star}
              alt="Imagem do card"
              className="w-auto h-auto object-cover"
            />
            <h3 className="text-lg sm:text-xl font-bold mt-4">
              Dê sua avaliação
            </h3>
            <p className="text-gray-600 mt-2">
              Deixe uma classificação e comentário para futuros pacientes terem
              uma noção de como é a consulta.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap mt-12">
          <div className="w-full sm:w-1/2 p-4">
            <Image
              src={Phone}
              alt="Imagem"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 p-4 lg:text-justify lg:pr-16">
            <p className="text-lg text-primary font-bold mb-2">Agendamento</p>
            <h1 className="font-bold text-5xl mb-6">
              Faça um agendamento com antecedência com o médico
            </h1>
            <p className="text-gray-500">
              Agendamento de consulta costuma ser chato e às vezes irritante.
              Porém, com aplivativo +SuaVida esse processo se torna simples e
              confortável.
            </p>

            <div className="mt-7">
              <span className="flex my-4">
                <BsCheckCircleFill size={26} color="#0079FF" className="mr-3" />
                Agendamento simples e confortável
              </span>
              <span className="flex my-4">
                <BsCheckCircleFill size={26} color="#0079FF" className="mr-3" />
                Cancele sua consulta a qualquer momento
              </span>
            </div>

            <button className="bg-primary py-4 mt-3 px-9 rounded-xl text-white font-bold">
              Baixe o app agora!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
