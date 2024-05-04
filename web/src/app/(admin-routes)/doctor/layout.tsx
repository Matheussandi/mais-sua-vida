import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { getDoctorById } from "@/services/get-doctor-by-id";

import { DoctorNavigation } from "./components/DoctorNavigation";
import { FaRegUserCircle } from "react-icons/fa";
import { ButtonLogout } from "@/components/ButtonLogout";

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

    return (
        <>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center">
                {doctor.doctorImage ? (
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE}/${doctor.doctorImage}`}
                        alt={doctor.nome}
                        width={130}
                        height={130}
                        className="h-full w-full object-cover rounded-full"
                    />
                ) : (
                    <FaRegUserCircle className="w-full h-full" />
                )}
            </div>

            <h1 className="mb-8 text-center text-xl font-bold uppercase">
                {`${doctor.nome} ${doctor.sobrenome}`}
            </h1>
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
                    <ButtonLogout />
                </div>
            </div>
            <div className="w-6/12 flex-grow bg-white">{children}</div>
        </div>
    );
}
