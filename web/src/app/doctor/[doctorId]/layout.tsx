import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { getDoctorById } from "@/services/get-doctor-by-id";

import { DoctorNavigation } from "../components/DoctorNavigation";
import { FiUser } from "react-icons/fi";

interface DoctorLayoutProps {
  children: ReactNode;
  params: {
    doctorId: string;
  };
}

interface DoctorIdProps {
  id: string;
}

interface DoctorProps {
  nome: string;
  sobrenome: string;
  doctorImage: string;
}

async function DoctorDetails({ id }: DoctorIdProps) {
  const doctor: DoctorProps = await getDoctorById(id);

  const urlBaseDasImagens = "http://localhost:3333/uploads/";
  const imageComplete = `${urlBaseDasImagens}${doctor.doctorImage}`;

  return (
    <>
      <div className="mb-4 h-32 w-full">
        {doctor.doctorImage ? (
          <Image
            src={`http://localhost:3333/uploads/${doctor.doctorImage}`}
            alt={doctor.nome}
            width={200}
            height={200}
            className="mx-auto mb-4 h-32 w-32 rounded-full"
          />
        ) : (
          <>
            <div className="flex justify-center ">
              <FiUser size={130} className="mx-auto mb-4 h-32 w-32" />
            </div>
          </>
        )}
      </div>
      <h1 className="mb-8 text-center text-xl font-bold uppercase">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
    </>
  );
}

export default function DoctorLayout({ children, params }: DoctorLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex w-72 flex-col rounded-lg bg-gray-50 shadow-md">
        <div className="p-4">
          <DoctorDetails id={params.doctorId} />
          <DoctorNavigation params={params} />
        </div>
        <div className="mt-auto p-4">
          <Link href="/login/doctor">
            <button className="w-full rounded bg-red-500 px-4 py-2 text-white">
              Sair
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-grow bg-white">{children}</div>
    </div>
  );
}
