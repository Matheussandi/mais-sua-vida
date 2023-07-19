import Image from "next/image";

import PhotoDoctor from "../assets/photoClinic.png";
import { getClinicById } from "@/services/get-clinic-by-id";

interface ClinicLayoutProps {
  id: string;
}

interface ClinicProps {
  nome: string;
  sobrenome: string;
  image: string;
}

export async function ClinicDetails({ id }: ClinicLayoutProps) {
  const doctor: ClinicProps = await getClinicById(id);

  return (
    <>
      <Image
        src={PhotoDoctor}
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
