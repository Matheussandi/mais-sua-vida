import Image from "next/image";
import { ReactNode } from "react";

import { AiFillTool } from "react-icons/ai";
import { FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { DoctorDetails } from "@/components/DoctorDetails";

interface DoctorLayoutProps {
  children: ReactNode;
  params: {
    doctorId: string;
  };
}

export default function DoctorLayout({ children, params }: DoctorLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex w-72 flex-col rounded-lg bg-gray-50 shadow-md">
        <div className="p-4">
          <DoctorDetails id={params.doctorId} />
          <nav className="border-t border-gray-300">
            <ul className="mt-5 list-none">
              <Link
                href={`/${params.doctorId}`}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <FaUser className="mr-2" size={20} />
                <span>Sobre</span>
              </Link>
              <Link
                href={`/${params.doctorId}/patients`}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <FaUsers className="mr-2" size={20} />
                <span>Pacientes</span>
              </Link>
              <Link
                href={{
                  pathname: `/${params.doctorId}/edit`,
                  query: params.doctorId,
                }}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <AiFillTool className="mr-2" size={20} />
                <span>Editar</span>
              </Link>
            </ul>
          </nav>
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
