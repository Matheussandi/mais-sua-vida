"use client";

import { useSearchParams } from "next/navigation";

import { getDoctorById } from "@/services/get-doctor-by-id";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface DoctorProps {
  id: string;
  nome: string;
  sobrenome: string;
  CRM: string;
  email: string;
  sobre: string;
  experiencia: string;
  especializacao: {
    nome: string;
  };
  image: string;
}

export default function DoctorSelected() {
  const searchParams = useSearchParams();
  const search = searchParams.get("doctor");

  const [doctor, setDoctor] = useState<DoctorProps>({
    id: "",
    nome: "",
    sobrenome: "",
    CRM: "",
    email: "",
    sobre: "",
    experiencia: "",
    especializacao: {
      nome: "",
    },
    image: "",
  });

  async function getDoctor() {
    try {
      const doctor: DoctorProps = await getDoctorById(search as string);
      setDoctor(doctor);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getDoctor();
    }
    fetchData();
  }, []);



  return (
    <div className="flex-grow p-10">
      <div className="relative rounded bg-gray-50 p-7">
        <div className="doctor-info">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold uppercase">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
              <p className="font-bold uppercase text-gray-500">
                {doctor.especializacao.nome}
              </p>
            </div>
{/*             <div>
              <FaTrash size={20} className="text-red-500" onClick={() => {}}/>
            </div> */}
          </div>

          <div className="mt-4 flex flex-col gap-10">
            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                Sobre
              </h2>
              <p>{doctor.sobre}</p>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                Experiência
              </h2>
              <p>{doctor.experiencia}</p>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                CRM
              </h2>
              <p>{doctor.CRM}</p>
            </div>
            <Link
              className="rounded bg-primary p-2 text-center text-white"
              href={{
                pathname: `./doctorSelected/patients`,
                query: { doctor: search },
              }}
            >
              Pacientes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
