import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import PhotoDoctor from "../../../assets/doctor1.png";

import { getDoctorById } from "@/services/get-doctor-by-id";

import { DoctorNavigation } from "../components/DoctorNavigation";

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
  image: string;
}

async function DoctorDetails({ id }: DoctorIdProps) {
  const doctor: DoctorProps = await getDoctorById(id);

  return (
    <>
      <Image
        src={PhotoDoctor}
        width={130}
        height={130}
        alt="Clinic"
        className="w-130 h-130 mx-auto mb-4 rounded-full"
      />
      <h1 className="mb-8 text-center text-xl font-bold uppercase">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
    </>
  );
}

export default function DoctorLayout({ children, params }: DoctorLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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
      {/* Main Content */}
      <div className="flex-grow bg-white">{children}</div>
    </div>
  );
}
