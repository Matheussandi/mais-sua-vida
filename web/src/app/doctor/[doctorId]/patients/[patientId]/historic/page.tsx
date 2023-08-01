import { getPatientById } from "../../../../../../services/get-patient-by-id";

import Image from "next/image";

import Retangle from "../../../../../../assets/Rectangle.svg";
import Patient from "../../../../../../assets/doctor1.png";
import { getHistoryByPatientId } from "@/services/get-history-by-patient-id";

import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

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
}

interface HistoryProps {
  id: string;
  data: string;
  descricao: string;
}

export default async function Historic({ params }: PatientId) {
  const patient: PatientProps = await getPatientById(params.patientId);
  const history: HistoryProps[] = await getHistoryByPatientId(params.patientId);

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
              className="rounded-full border-[6px] border-solid border-white"
            />
            <h1 className="my-2 text-2xl font-extrabold">{`${patient.nome} ${patient.sobrenome}`}</h1>
          </div>
        </div>

        {/* Listagem do histórico do paciente */}
        <div className="">
          <div className="mt-12 flex flex-col">
            <div className="relative mt-10 max-h-80 max-w-screen-xl overflow-y-scroll p-5">
              <ul className="divide-y divide-gray-300">
                {/* Renderiza os itens do histórico dinamicamente */}
                {history.map((item) => (
                  <li key={item.id} className="py-2">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <p className="ml-3 font-medium text-gray-500">
                        {dayjs(item.data).format("D[ de ]MMMM[ de ]YYYY")}
                      </p>
                    </div>
                    <p className="ml-7 text-gray-800">{item.descricao}</p>
                    {/*                     {item.medicos.length > 0 && (
                      <p className="ml-7 text-gray-800">Médico: {item.medicos[0].nome}</p>
                    )} */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <button className="rounded-lg bg-primary px-16 py-5 font-bold text-white ">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
