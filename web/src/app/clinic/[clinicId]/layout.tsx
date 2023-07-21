import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import PhotoClinic from "../../../assets/photoClinic.png";

import { getClinicById } from "@/services/get-clinic-by-id";

import { ClinicNavigation } from "../components/ClinicNavigation";

interface ClinicLayoutProps {
  children: ReactNode;
  params: {
    clinicId: string;
  };
}

interface ClinicIdProps {
  id: string;
}

interface ClinicProps {
  nome: string;
  sobrenome: string;
  image: string;
}

async function ClinicDetails({ id }: ClinicIdProps) {
  const doctor: ClinicProps = await getClinicById(id);

  return (
    <>
      <Image
        src={PhotoClinic}
        width={130}
        height={130}
        alt="Clinic"
        className="w-130 h-130 mx-auto mb-4 rounded-full"
      />
      <h1 className="mb-8 text-center text-xl font-bold uppercase">
        {doctor.nome}
      </h1>
    </>
  );
}

export default function ClinicLayout({ children, params }: ClinicLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex w-72 flex-col rounded-lg bg-gray-50 shadow-md">
        <div className="p-4">
          <ClinicDetails id={params.clinicId} />
          <ClinicNavigation params={params} />
        </div>
        <div className="mt-auto p-4">
          <Link href="/login/clinic">
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
