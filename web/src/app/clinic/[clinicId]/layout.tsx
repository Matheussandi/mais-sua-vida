import Image from "next/image";
import { ReactNode } from "react";

import PhotoClinic from "../../../assets/photoClinic.png";

import { AiFillHome, AiFillTool } from "react-icons/ai";
import { BsFillFilePersonFill, BsShieldFillCheck } from "react-icons/bs";
import Link from "next/link";
import { ClinicDetails } from "@/components/ClinicDetails";

interface ClinicLayoutProps {
  children: ReactNode;
  params: {
    clinicId: string;
  };
}

export default function ClinicLayout({ children, params }: ClinicLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex w-72 flex-col rounded-lg bg-gray-50 shadow-md">
        <div className="p-4">
          <ClinicDetails id={params.clinicId} />
          <nav className="border-t border-gray-300">
            <ul className="mt-5 list-none">
              {/*               <Link
                href={`/clinic/${params.clinicId}`}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <AiFillHome className="mr-2" size={20} />
                <span>Início</span>
              </Link> */}
              <Link
                href={`/clinic/${params.clinicId}`}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <BsFillFilePersonFill className="mr-2" size={20} />
                <span>Médicos</span>
              </Link>
              <Link
                href={{
                  pathname: `/clinic/${params.clinicId}/settings`,
                  query: {
                    clinicId: params.clinicId,
                  },
                }}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <AiFillTool className="mr-2" size={20} />
                <span>Configurações</span>
              </Link>
              <Link
                href={`/clinic/${params.clinicId}/plans`}
                className="flex items-center py-2 hover:text-blue-500"
              >
                <BsShieldFillCheck className="mr-2" size={20} />
                <span>Planos</span>
              </Link>
            </ul>
          </nav>
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
