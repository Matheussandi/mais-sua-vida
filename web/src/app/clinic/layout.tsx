import Image from "next/image";
import { ReactNode } from "react";

import DoisMedicos from "../../assets/twodoctors.png";

import { IoIosJournal } from "react-icons/io";
import { AiFillHome, AiFillTool } from "react-icons/ai";
import { BsFillFilePersonFill, BsShieldFillCheck } from "react-icons/bs";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-gray-50 h-screen flex">
      <div className="w-72 bg-gray-50 flex flex-col rounded-lg shadow-md">
        <div className="p-4">
          <Image
            src={DoisMedicos}
            width={130}
            height={130}
            alt="Clinic"
            className="w-130 h-130 rounded-full mx-auto mb-4"
          />
          <h1 className="text-xl font-bold mb-8 text-center">
            Nome da Clínica
          </h1>
          <nav className="border-t border-gray-300">
            <ul className="list-none mt-5">
              <Link
                href="/clinic"
                className="flex items-center py-2 hover:text-blue-500"
              >
                <AiFillHome className="mr-2" size={20} />
                <span>Início</span>
              </Link>
              <Link
                href="/clinic/doctors"
                className="flex items-center py-2 hover:text-blue-500"
              >
                <BsFillFilePersonFill className="mr-2" size={20} />
                <span>Médicos</span>
              </Link>
              <Link
                href="/clinic/annotation"
                className="flex items-center py-2 hover:text-blue-500"
              >
                <IoIosJournal className="mr-2" size={20} />
                <span>Anotação</span>
              </Link>
              <Link
                href="/clinic/settings"
                className="flex items-center py-2 hover:text-blue-500"
              >
                <AiFillTool className="mr-2" size={20} />
                <span>Configuração</span>
              </Link>
              <Link
                href="/clinic/plan"
                className="flex items-center py-2 hover:text-blue-500"
              >
                <BsShieldFillCheck className="mr-2" size={20} />
                <span>Plano</span>
              </Link>
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link href="/login/clinic">
            <button className="bg-red-500 text-white py-2 px-4 rounded w-full">
              Sair
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-grow bg-white">{children}</div>
    </div>
  );
}
