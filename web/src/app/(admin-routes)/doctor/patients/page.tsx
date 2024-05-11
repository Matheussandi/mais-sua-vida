"use client";

import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { MdDateRange } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

import { getMedicalAppointments } from "../../../../services/get-medical-appointments";
import { getPatients } from "../../../../services/get-patients";

import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

dayjs.locale(ptBr);

interface PatientsProps {
  id: string;
  nome: string;
  sobrenome: string;
  patientImage: string;
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
  const { data } = useSession();
  
  const [filter, setFilter] = useState("today");
  const [patients, setPatients] = useState<PatientsProps[]>([]);
  const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);

  const doctorId = data?.user.id;

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
      case "today":
        return doctorAppointments.filter((appointment) =>
          dayjs(appointment.data).isSame(dayjs(), "day")
        );
      case "past":
        return doctorAppointments.filter((appointment) =>
          dayjs(appointment.data).isBefore(dayjs(), "day")
        );
      case "future":
        return doctorAppointments.filter((appointment) =>
          dayjs(appointment.data).isAfter(dayjs(), "day")
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
            <option value="today">Hoje</option>
            <option value="past">Passadas</option>
            <option value="future">Futuras</option>
          </select>
        </div>

        <div className="mt-7">
          {filteredAppointments().length === 0 ? (
            <div className="text-center font-semibold">
              Não há consultas
            </div>
          ) : (
            filteredAppointments().map((appointment) => {
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
                      {patient?.patientImage ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${patient?.patientImage}`}
                          alt={patient?.nome ?? ""}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <BiUserCircle size={75} opacity={0.6} />
                      )}
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
