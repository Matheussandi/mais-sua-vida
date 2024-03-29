"use client";

import Link from "next/link";
import { FaUser, FaUsers } from "react-icons/fa";
import { AiFillTool } from "react-icons/ai";
import { usePathname } from "next/navigation";

interface DoctorLayoutProps {
  params: {
    doctorId: string;
  };
}

export function DoctorNavigation({ params }: DoctorLayoutProps) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-300">
      <ul className="mt-5 list-none">
        <li>
          <Link
            href={`/doctor/${params.doctorId}`}
            className={`flex items-center py-2 hover:text-primary ${
              pathname === `/doctor/${params.doctorId}`
                ? "text-primary"
                : "text-black"
            }`}
          >
            <FaUser className="mr-2" size={20} />
            <span>Sobre</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/doctor/${params.doctorId}/patients`}
            className={`flex items-center py-2 hover:text-primary ${
              pathname.includes("/patients") ? "text-primary" : "text-black"
            }`}
          >
            <FaUsers className="mr-2" size={20} />
            <span>Pacientes</span>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/doctor/${params.doctorId}/edit`,
              query: { doctor: params.doctorId },
            }}
            className={`flex items-center py-2 hover:text-primary ${
              pathname === `/doctor/${params.doctorId}/edit`
                ? "text-primary"
                : "text-black"
            }`}
          >
            <AiFillTool className="mr-2" size={20} />
            <span>Editar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
