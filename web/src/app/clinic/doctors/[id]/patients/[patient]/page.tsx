import Link from "next/link";
import { getPatientById } from "../../../../../../services/get-patient-by-id";
import { MdModeEdit } from "react-icons/md";

import Image from "next/image";

import Retangle from "../../../../../../assets/Rectangle.svg";
import Patient from "../../../../../../assets/doctor1.png";

interface PatientId {
  params: {
    patient: string;
  };
}

interface PatientProps {
  id: string;
  nome: string;
  sobrenome: string;
}

export default async function PatientDetails({ params }: PatientId) {
  const patient: PatientProps = await getPatientById(params.patient);

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
              src={Patient}
              alt=""
              width={120}
              height={120}
              className="rounded-full"
              style={{ border: "6px solid white" }}
            />
            <h1 className="my-2 text-2xl font-extrabold">{`${patient.nome} ${patient.sobrenome}`}</h1>
          </div>
        </div>

        <div className="p-7">
          <div className="mt-12 flex flex-col">
            <div className="flex gap-10 border-t-2 border-gray-200 p-10 justify-around">
              <div>
                <h2 className="font-bold uppercase">Sobre</h2>
                <p>Gênero:</p>
                <p>Idade:</p>
                <p>Data de Nascimento:</p>
                <p>Ocupação:</p>
              </div>
              <div>
                <h2 className="font-bold uppercase">Endereço</h2>
                <p>CEP:</p>
                <p>Estado:</p>
                <p>Cidade:</p>
                <p>Rua:</p>
              </div>
              <div>
                <h2 className="font-bold uppercase">Contato</h2>
                <p>E-mail:</p>
                <p>Celular:</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="rounded-lg bg-primary px-16 py-5 font-bold text-white ">
                Histórico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
