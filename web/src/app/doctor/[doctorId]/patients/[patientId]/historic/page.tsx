"use client";

import { getPatientById } from "../../../../../../services/get-patient-by-id";

import Image from "next/image";

import Retangle from "../../../../../../assets/Rectangle.svg";
import { getHistoryByPatientId } from "@/services/get-history-by-patient-id";

import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { BasicModal } from "@/app/doctor/components/BasicModal";
import { useEffect, useState } from "react";

dayjs.locale(ptBr);

interface PatientId {
  params: {
    patientId: string;
  };
}

interface PatientProps {
  id: string;
  nome: string;
  sobrenome: string;
  patientImage: string;
}

interface HistoryProps {
  id: string;
  data: string;
  descricao: string;
}

export default function Historic({ params }: PatientId) {
  const [patient, setPatient] = useState<PatientProps>({
    id: "",
    nome: "",
    sobrenome: "",
    patientImage: "",
  });
  const [history, setHistory] = useState<HistoryProps[]>([]);

  async function getPatient() {
    const patient: PatientProps = await getPatientById(params.patientId);
    setPatient(patient);
  }

  async function getHistory() {
    const history: HistoryProps[] = await getHistoryByPatientId(
      params.patientId
    );
    setHistory(history);
  }

  useEffect(() => {
    async function fetchData() {
      await getPatient();
      await getHistory();
    }

    fetchData();

    const interval = setInterval(fetchData, 1000); // 1 seconds

    return () => clearInterval(interval);
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="flex-grow p-10">
      <div className="relative rounded bg-gray-50 ">
        <div className="relative">
          <Image
            src={Retangle}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform">
            <Image
              src={`http://localhost:3333/uploads/${patient.patientImage}`}
              alt=""
              width={120}
              height={120}
              className="h-32 w-32 rounded-full"
              style={{ border: "6px solid white" }}
            />
            <h1 className="my-2 text-2xl font-extrabold">{`${patient.nome} ${patient.sobrenome}`}</h1>
          </div>
        </div>

        <div className="">
          <div className="mt-12 flex flex-col">
            <div className="relative mt-10 max-h-80 max-w-screen-xl overflow-y-scroll p-5">
              <ul className="divide-y divide-gray-300">
                {history.map((item) => (
                  <li key={item.id} className="py-2">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <p className="ml-3 font-medium text-gray-500">
                        {dayjs(item.data).format("D[ de ]MMMM[ de ]YYYY")}
                      </p>
                    </div>
                    <p className="ml-7 text-gray-800">{item.descricao}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-6 flex items-center justify-center">
              <button
                className="rounded-lg bg-primary px-10 py-3 font-bold text-white"
                onClick={handleOpenModal}
              >
                Adicionar
              </button>

              {modalIsOpen === true && (
                <BasicModal
                  isOpen={modalIsOpen}
                  onClose={handleCloseModal}
                  onOpen={handleOpenModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
