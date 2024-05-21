"use client";

import { useState } from "react";
import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";

import Secretary from "../assets/secretary.webp";
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
    <section id="clinics">
      <div className="mt-16 flex flex-col lg:flex-row">
        {/* Primeira coluna */}
        <div className="w-full lg:w-1/2">
          <Image
            src={Secretary}
            alt="Imagem"
            className="h-full w-full object-cover md:p-10"
          />
        </div>

        {/* Segunda coluna */}
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="my-5 font-bold text-primary">Para clínicas</div>
          <div className="h-2/3 lg:h-full">
            <h1 className="text-3xl font-bold">Gerencie suas consultas </h1>
            <p className="my-5 text-justify text-gray-500">
              Com recursos como armazenamento de informações do paciente,
              listagem de médicos, agendamento automatizado e avisos automáticos
              para o comparecimento de consultas. Reduza a carga de trabalho
              manual, economize tempo e melhore a eficiência de sua clínicas
              somente um lugar.
            </p>
          </div>
          <div className="flex h-1/3 flex-wrap lg:h-full">
            <div className="w-1/2 bg-white p-4">
              <div className="flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
                <div className="align-center">
                  <Image
                    src={Patitents}
                    width={50}
                    height={50}
                    alt="Dois médicos juntos"
                    className="rounded-lg "
                  />
                  <div className="my-5 h-px w-1/3 rounded-lg border-2 border-solid border-primary"></div>
                  <h3 className="font-bold">Pacientes</h3>
                  <p className="my-5 text-gray-500">Armazene as informações</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-white p-4">
              <div className="flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
                <div className="align-center">
                  <Image
                    src={Doctors}
                    width={50}
                    height={50}
                    alt="Dois médicos juntos"
                    className="rounded-lg "
                  />
                  <div className="my-5 h-px w-1/3 rounded-lg border-2 border-solid border-primary"></div>
                  <h3 className="font-bold">Médicos</h3>
                  <p className="my-5 text-gray-500">Liste todos médicos</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-white p-4">
              <div className="flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
                <div className="align-center">
                  <Image
                    src={Scheduling}
                    width={50}
                    height={50}
                    alt="Dois médicos juntos"
                    className="rounded-lg "
                  />
                  <div className="my-5 h-px w-1/3 rounded-lg border-2 border-solid border-primary"></div>
                  <h3 className="font-bold">Agendamento</h3>
                  <p className="my-5 text-gray-500">
                    Busque informações do paciente
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-white p-4">
              <div className="flex-col items-center justify-center rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg">
                <div className="align-center">
                  <Image
                    src={Confirmation}
                    width={50}
                    height={50}
                    alt="Dois médicos juntos"
                    className="rounded-lg "
                  />
                  <div className="my-5 h-px w-1/3 rounded-lg border-2 border-solid border-primary"></div>
                  <h3 className="font-bold">Confirmação</h3>
                  <p className="my-5 text-gray-500">
                    Confirme sua data e horário
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="cursor-pointer py-5 text-start font-bold text-primary"
            onClick={openModal}
          >
            Saber mais
          </button>
        </div>

        {/* Pop-up */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md lg:max-w-4xl">
              <div className="flex justify-end">
                <button
                  className="p-4 text-primary focus:outline-none"
                  onClick={closeModal}
                >
                  {/* Ícone de fechar */}
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                {/* Conteúdo 1 */}
                <div className="mb-8 flex lg:mb-0">
                  <div className="w-full lg:mr-6">
                    <h3 className="text-lg font-bold">Pacientes</h3>
                    <div className="my-5 h-px w-full rounded-lg border-2 border-solid border-primary"></div>
                    <p className="text-gray-500">
                      Gerencie os dados dos pacientes, incluindo históricos
                      médicos e registros de consultas.
                    </p>
                  </div>
                </div>

                {/* Conteúdo 2 */}
                <div className="mb-8 flex lg:mb-0">
                  <div className="w-full lg:mr-6">
                    <h3 className="text-lg font-bold">Médicos</h3>
                    <div className="my-5 h-px w-full rounded-lg border-2 border-solid border-primary"></div>
                    <p className="text-gray-500">
                      Atribua consultas aos médicos disponíveis, acompanhe a
                      agenda de cada profissional e evite sobrecargas ou lacunas
                      de atendimento.
                    </p>
                  </div>
                </div>

                {/* Conteúdo 3 */}
                <div className="flex">
                  <div className="w-full lg:mr-6">
                    <h3 className="text-lg font-bold">Agendamento</h3>
                    <div className="my-5 h-px w-full rounded-lg border-2 border-solid border-primary"></div>
                    <p className="text-gray-500">
                      Automatize o processo de agendamento de consultas. Permita
                      aos pacientes a conveniência de marcar consultas online,
                      24 horas por dia.
                    </p>
                  </div>
                </div>

                {/* Conteúdo 4 */}
                <div className="flex">
                  <div className="w-full lg:mr-6">
                    <h3 className="text-lg font-bold">Confirmação</h3>
                    <div className="my-5 h-px w-full rounded-lg border-2 border-solid border-primary"></div>
                    <p className="text-gray-500">
                      Aumente a eficiência e reduza o número de consultas não
                      comparecidas, reduzindo o desperdício de tempo e recursos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
