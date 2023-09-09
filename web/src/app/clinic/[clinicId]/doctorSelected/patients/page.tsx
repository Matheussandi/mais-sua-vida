"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPatients } from "../../../../../services/get-patients";
import Pacientes from "../../../../../assets/doctor1.png";
import { MdDateRange } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { getMedicalAppointments } from "@/services/get-medical-appointments";

import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale(ptBr);

interface PatientsProps {
  id: number;
  nome: string;
  sobrenome: string;
}

interface AppointmentsProps {
  id: number;
  data: string;
  hora: string;
  local: string;
  idPaciente: number;
  idMedico: string;
}

export default function Patients() {
  const searchParams = useSearchParams();
  const search = searchParams.get("doctor");
  const doctorId = search;

  const [filter, setFilter] = useState("today");
  const [filteredAppointments, setFilteredAppointments] = useState<
    AppointmentsProps[]
  >([]);
  const [patients, setPatients] = useState<PatientsProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData: PatientsProps[] = await getPatients();
        const appointments: AppointmentsProps[] =
          await getMedicalAppointments();

        const doctorAppointments = appointments.filter(
          (appointment) => appointment.idMedico === doctorId
        );

        const today = dayjs().format("YYYY-MM-DD");

        let filtered: AppointmentsProps[] = [];

        if (filter === "today") {
          filtered = doctorAppointments.filter(
            (appointment) => appointment.data === today
          );
        } else if (filter === "past") {
          filtered = doctorAppointments.filter(
            (appointment) => appointment.data < today
          );
        } else if (filter === "future") {
          filtered = doctorAppointments.filter(
            (appointment) => appointment.data > today
          );
        }

        setFilteredAppointments(filtered);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [doctorId, filter]);

  const getPatientName = (idPaciente: number) => {
    const patient = patients.find((p) => p.id === idPaciente);
    return patient
      ? `${patient.nome} ${patient.sobrenome}`
      : "Paciente não encontrado";
  };

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <div className="mb-4 font-bold">
          <select
            className="rounded-lg bg-gray-50 p-2"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="today">Hoje</option>
            <option value="past">Passadas</option>
            <option value="future">Futuras</option>
          </select>
        </div>

        <div className="mt-7">
          {filteredAppointments.length === 0 ? (
            <p className="text-center">Não há consultas agendadas.</p>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="mb-4">
                <div className="h-150 w-200 flex items-center border-t-2 border-gray-300 py-2">
                  <div className="h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={Pacientes}
                      alt={appointment.idPaciente.toString()}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 grid w-full grid-cols-3 gap-4">
                    <div className="max-w-48 overflow-hidden">
                      <span className="block">
                        {getPatientName(appointment.idPaciente)}
                      </span>
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <MdDateRange size={20} />
                        <span>
                          {dayjs(appointment.data).format("D[ ]MMM[ ]YYYY")}
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
