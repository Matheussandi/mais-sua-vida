import Image from "next/image";

import PhotoDoctor from "../assets/doctor1.png";
import { getDoctorById } from "@/services/get-doctor-by-id";

interface DoctorLayoutProps {
  id: string;
}

interface DoctorProps {
  nome: string;
  sobrenome: string;
  image: string;
}

export async function DoctorDetails({ id }: DoctorLayoutProps) {
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
      <h1 className="mb-8 text-center text-xl uppercase font-bold">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
    </>
  );
}
