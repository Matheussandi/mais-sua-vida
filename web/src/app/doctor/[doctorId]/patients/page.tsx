"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { getPatients } from "../../../../services/get-patients";
import { getMedicalAppointments } from "../../../../services/get-medical-appointments";
import { usePathname } from "next/navigation";
import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

import Patient from "../../../../assets/doctor1.png";

dayjs.locale(ptBr);

interface PatientsProps {
  id: string;
  nome: string;
  sobrenome: string;
}

interface AppointmentsProps {
  id: string;
  data: string;
  hora: string;
  local: string;
  idPaciente: string;
  idMedico: string;
}

export default function Patients() {
  const [filter, setFilter] = useState("hoje");
  const [patients, setPatients] = useState<PatientsProps[]>([]);
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);

  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const doctorId = pathParts[2];

  useEffect(() => {
    async function fetchData() {
      const patientsData: PatientsProps[] = await getPatients();
      const appointmentsData: AppointmentsProps[] =
        await getMedicalAppointments();

      setPatients(patientsData);
      setAppointments(appointmentsData);
    }

    fetchData();
  }, []);

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.idMedico === doctorId
  );

  const patientIds = doctorAppointments.map(
    (appointment) => appointment.idPaciente
  );

  const patientAppointments = patients.filter((patient) =>
    patientIds.includes(patient.id)
  );

  const filteredAppointments = () => {
    switch (filter) {
      case "hoje":
        return doctorAppointments.filter((appointment) =>
          dayjs(appointment.data).isSame(dayjs(), "day")
        );
      case "passadas":
        return doctorAppointments.filter((appointment) =>
          dayjs(appointment.data).isBefore(dayjs(), "day")
        );
      default:
        return doctorAppointments;
    }
  };

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <div className="mb-4 font-bold">
          <select
            className="rounded-lg bg-gray-50 p-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="hoje">Hoje</option>
            <option value="passadas">Consultas Passadas</option>
            {/* Adicione opções adicionais para futuras consultas, se necessário */}
          </select>
        </div>

        <div className="mt-7">
          {filteredAppointments().map((appointment) => {
            const patient = patientAppointments.find(
              (p) => p.id === appointment.idPaciente
            );
            return (
              <div key={appointment.id} className="mb-4">
                <Link
                  href={`./patients/${patient?.id}`}
                  className="h-150 w-200 flex items-center border-t-2 border-gray-300 py-2"
                >
                  <div className="h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={Patient}
                      alt={patient.nome}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 grid w-full grid-cols-3 gap-4">
                    <div className="max-w-48 overflow-hidden">
                      <span className="block">
                        {patient?.nome} {patient?.sobrenome}
                      </span>
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <MdDateRange size={20} />
                        <span>
                          {dayjs(appointment.data).format("D[ ]MMM[  ]YYYY")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <FiClock size={20} />
                        <span>{appointment.hora}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
