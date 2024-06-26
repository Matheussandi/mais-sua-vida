"use client"

import { getPatientById } from "../../../../../services/get-patient-by-id";

import Image from "next/image";
import Link from "next/link";

import Retangle from "../../../../../assets/Rectangle.svg";

import { HeightConverter } from "@/utils/HeightConverter";
import { WeightConverter } from "@/utils/WeightConverter";
import { calculateAge } from "@/utils/calculateAge";

import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  email: string;
  telefone: string;
  dataNascimento: string;
  altura: string;
  peso: string;
}

export default function PatientDetails({ params }: PatientId) {
const pathname = usePathname();
const parts = pathname.split('/');
const patientId = parts[parts.length - 1];

const [patient, setPatient] = useState<PatientProps>();

const formattedDate = dayjs(patient?.dataNascimento).format("DD/MM/YYYY");

useEffect(() => {
  async function fetchData() {
    const patientData: PatientProps = await getPatientById(patientId);
    setPatient(patientData);
  }

  fetchData();
}, [])

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
              src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${patient?.patientImage}`}
              alt=""
              width={120}
              height={120}
              className="h-32 w-32 rounded-full"
              style={{ border: "6px solid white" }}
            />
            <h1 className="my-2 text-2xl font-extrabold">{`${patient?.nome} ${patient?.sobrenome}`}</h1>
          </div>
        </div>

        <div className="p-7">
          <div className="mt-12 flex flex-col">
            <div className="flex justify-around gap-10 border-t-2 border-gray-200 p-10">
              <div>
                <h2 className="font-bold uppercase">Sobre</h2>
                <p>
                  Idade:{" "}
                  {patient?.dataNascimento
                    ? calculateAge(patient.dataNascimento)
                    : ""}
                </p>
                <p>
                  Data de Nascimento:{" "}
                  {patient?.dataNascimento ? formattedDate : ""}
                </p>
                <p>
                  Altura:{" "}
                  {patient?.altura ? HeightConverter(patient.altura) : ""}
                </p>
                <p>Peso: {patient?.peso ? WeightConverter(patient.peso) : ""}</p>
              </div>

              <div>
                <h2 className="font-bold uppercase">Contato</h2>
                <p>E-mail: {patient?.email}</p>
                <p>Celular: {patient?.telefone}</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href={`./${params.patientId}/historic`}
                className="rounded-lg bg-primary px-16 py-5 font-bold text-white "
              >
                Histórico
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
