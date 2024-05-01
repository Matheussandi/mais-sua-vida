import { ReactNode } from "react";

import { FaRegUserCircle } from "react-icons/fa";

import Image from "next/image";

import { getClinicById } from "@/services/get-clinic-by-id";

import { ClinicNavigation } from "./components/ClinicNavigation";
import { ButtonLogout } from "@/components/ButtonLogout";


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
  clinicImage: string;
}

async function ClinicDetails({ id }: ClinicIdProps) {
  const clinic: ClinicProps = await getClinicById(id);

  return (
    <>
      <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center">
        {clinic.clinicImage ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${clinic.clinicImage}`}
            width={130}
            height={130}
            alt="Clinic"
            className="h-full w-full object-cover"
          />
        ) : (
          <FaRegUserCircle className="w-full h-full" />
        )}
      </div>
      <h1 className="mb-8 text-center text-xl font-bold uppercase">
        {clinic.nome}
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
          <ButtonLogout />
        </div>
      </div>
      <div className="flex-grow bg-white w-6/12">{children}</div>
    </div>
  );
}
