import Image from "next/image";

import { getPatients } from "../../../../../services/get-patients";
import Link from "next/link";

import Pacientes from "../../../../../assets/doctor1.png";
import { MdDateRange } from "react-icons/md";
import { FiClock } from "react-icons/fi";

interface PatientesProps {
  id: number;
  nome: string;
  sobrenome: string;
}

export default async function Patients() {
  const patients: PatientesProps[] = await getPatients();

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        {/* Select para filtrar pacientes */}
        <div className="mb-4 font-bold">
          <select className="rounded-lg bg-gray-50 p-2">
            <option value="">Hoje</option>
            <option value="1">Ontem</option>
            <option value="2">Antes de ontem</option>
          </select>
        </div>

        {/* Listagem de pacientes */}
        <div className="mt-7">
          {patients.map((patient) => (
            <div key={patient.id} className="mb-4">
              <div className="h-150 w-200 flex items-center  border-t-2 border-gray-300 py-2">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  {/* Sem imagem por enquanto */}
                  <Image
                    src={Pacientes}
                    alt={patient.nome}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>{patient.nome + " " + patient.sobrenome}</div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-around ">
                    <div className="flex items-center gap-1">
                      <MdDateRange size={20} />
                      <h3>18 Out 2022</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock size={20} />
                      <h3>11:00 horas</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
