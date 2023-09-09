"use client";

import Image from "next/image";

import { getPatients } from "../../../../services/get-patients";
import Link from "next/link";

import Pacientes from "../../../../assets/doctor1.png";
import { MdDateRange } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { getMedicalAppointments } from "@/services/get-medical-appointments";
import { usePathname } from "next/navigation";

import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale(ptBr);

interface PatientesProps {
  id: number;
  nome: string;
  sobrenome: string;
}

interface AppointmentsProps {
  id: number;
  data: string;
  hora: string;
  local: string;
  idPaciente: string;
  idMedico: string;
}

export default async function Patients() {
  const pathname = usePathname();

  // Divide o pathname em partes, separando-as pelos caracteres '/'
  const pathParts = pathname.split("/");

  const doctorId = pathParts[2];

  const patients: PatientesProps[] = await getPatients();
  const appointments: AppointmentsProps[] = await getMedicalAppointments();

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.idMedico === doctorId
  );

  const patientId = doctorAppointments.map((patient) => patient.idPaciente);

  const pattientAppointments = patients.filter((patient) =>
    patientId.includes(patient.id)
  );

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        {/* Select para filtrar pacientes */}
        <div className="mb-4 font-bold">
          <select className="rounded-lg bg-gray-50 p-2">
            <option value="">Hoje</option>
            <option value="1">Consultas Passadas</option>
          </select>
        </div>

        {/* Listagem de pacientes */}
        <div className="mt-7">
          {pattientAppointments.map((patient) => (
            <div key={patient.id} className="mb-4 ">
              <Link
                href={`./patients/${patient.id}`}
                className="h-150 w-200 flex items-center  border-t-2 border-gray-300 py-2"
              >
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
                <div className="ml-4 grid w-full grid-cols-3 gap-4">
                  <div className="max-w-48 overflow-hidden">
                    <span className="block">
                      {patient.nome} {patient.sobrenome}
                    </span>
                  </div>

                  <div>
                    {/* Exibir informações das consultas */}
                    {doctorAppointments.map(
                      (appointment, index) =>
                        index === 0 && (
                          <div key={appointment.id} className="flex space-x-2">
                            <MdDateRange size={20} />
                            <span>
                              {dayjs(appointment.data).format(
                                "D[ ]MMM[  ]YYYY"
                              )}
                            </span>
                          </div>
                        )
                    )}
                  </div>
                  <div>
                    {/* Exibir informações das consultas */}
                    {doctorAppointments.map(
                      (appointment, index) =>
                        index === 0 && (
                          <div key={appointment.id} className="flex space-x-2">
                            <FiClock size={20} />
                            <span>{appointment.hora}</span>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
