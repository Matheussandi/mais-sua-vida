"use client";

import { useState } from "react";
import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";

import Secretary from "../assets/secretary.png";
import Patitents from "../assets/patients.png";
import Doctors from "../assets/doctors.png";
import Scheduling from "../assets/scheduling.png";
import Confirmation from "../assets/confirmation.png";

export function Clinics() {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col lg:flex-row mt-16">
      {/* Primeira coluna */}
      <div className="w-full lg:w-1/2">
        <Image
          src={Secretary}
          alt="Imagem"
          className="w-full h-full object-cover md:p-10"
        />
      </div>

      {/* Segunda coluna */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="my-5 font-bold text-primary">Para clínicas</div>
        <div className="h-2/3 lg:h-full">
          <h1 className="font-bold text-3xl">Gerencie suas consultas </h1>
          <p className="my-5 text-justify text-gray-500">
            Com recursos como armazenamento de informações do paciente, listagem
            de médicos, agendamento automatizado e avisos automáticos para o
            comparecimento de consultas. Reduza a carga de trabalho manual,
            economize tempo e melhore a eficiência de sua clínicas somente um
            lugar.
          </p>
        </div>
        <div className="h-1/3 lg:h-full flex flex-wrap">
          <div className="w-1/2 bg-white p-4">
            <div className="shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="align-center">
                <Image
                  src={Patitents}
                  width={50}
                  height={50}
                  alt="Dois médicos juntos"
                  className="rounded-lg "
                />
                <div className="border-2 border-solid border-primary h-px w-1/3 my-5 rounded-lg"></div>
                <h3 className="font-bold">Pacientes</h3>
                <p className="my-5 text-gray-500">Armazene as informações</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white p-4">
            <div className="shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="align-center">
                <Image
                  src={Doctors}
                  width={50}
                  height={50}
                  alt="Dois médicos juntos"
                  className="rounded-lg "
                />
                <div className="border-2 border-solid border-primary h-px w-1/3 my-5 rounded-lg"></div>
                <h3 className="font-bold">Médicos</h3>
                <p className="my-5 text-gray-500">Liste todos médicos</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white p-4">
            <div className="shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="align-center">
                <Image
                  src={Scheduling}
                  width={50}
                  height={50}
                  alt="Dois médicos juntos"
                  className="rounded-lg "
                />
                <div className="border-2 border-solid border-primary h-px w-1/3 my-5 rounded-lg"></div>
                <h3 className="font-bold">Agendamento</h3>
                <p className="my-5 text-gray-500">
                  Busque informações do paciente
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 bg-white p-4">
            <div className="shadow-md rounded-lg p-4 flex-col items-center justify-center hover:shadow-lg transition-shadow">
              <div className="align-center">
                <Image
                  src={Confirmation}
                  width={50}
                  height={50}
                  alt="Dois médicos juntos"
                  className="rounded-lg "
                />
                <div className="border-2 border-solid border-primary h-px w-1/3 my-5 rounded-lg"></div>
                <h3 className="font-bold">Confirmação</h3>
                <p className="my-5 text-gray-500">
                  Confirme sua data e horário
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="py-5 font-bold text-primary cursor-pointer text-start"
          onClick={openModal}
        >
          Saber mais
        </button>
      </div>

      {/* Pop-up */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md lg:max-w-4xl">
            <div className="flex justify-end">
              <button
                className="text-primary focus:outline-none p-4"
                onClick={closeModal}
              >
                {/* Ícone de fechar */}
                <AiOutlineClose size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Conteúdo 1 */}
              <div className="flex mb-8 lg:mb-0">
                <div className="w-full lg:mr-6">
                  <h3 className="text-lg font-bold">Pacientes</h3>
                  <div className="border-2 border-solid border-primary h-px w-full my-5 rounded-lg"></div>
                  <p className="text-gray-500">
                    Busque informações do paciente. Busque informações do
                    paciente. Busque informações do paciente.
                  </p>
                </div>
              </div>

              {/* Conteúdo 2 */}
              <div className="flex mb-8 lg:mb-0">
                <div className="w-full lg:mr-6">
                  <h3 className="text-lg font-bold">Médicos</h3>
                  <div className="border-2 border-solid border-primary h-px w-full my-5 rounded-lg"></div>
                  <p className="text-gray-500">
                    Busque informações do paciente. Busque informações do
                    paciente. Busque informações do paciente.
                  </p>
                </div>
              </div>

              {/* Conteúdo 3 */}
              <div className="flex">
                <div className="w-full lg:mr-6">
                  <h3 className="text-lg font-bold">Agendamento</h3>
                  <div className="border-2 border-solid border-primary h-px w-full my-5 rounded-lg"></div>
                  <p className="text-gray-500">
                    Busque informações do paciente. Busque informações do
                    paciente. Busque informações do paciente.
                  </p>
                </div>
              </div>

              {/* Conteúdo 4 */}
              <div className="flex">
                <div className="w-full lg:mr-6">
                  <h3 className="text-lg font-bold">Confirmação</h3>
                  <div className="border-2 border-solid border-primary h-px w-full my-5 rounded-lg"></div>
                  <p className="text-gray-500">
                    Busque informações do paciente. Busque informações do
                    paciente. Busque informações do paciente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
