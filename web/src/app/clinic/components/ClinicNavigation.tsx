"use client";

import Link from "next/link";
import { AiFillTool } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { BsFillFilePersonFill, BsShieldFillCheck } from "react-icons/bs";

interface ClinicLayoutProps {
  params: {
    clinicId: string;
  };
}

export function ClinicNavigation({ params }: ClinicLayoutProps) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-300">
      <ul className="mt-5 list-none">
        <li>
          <Link
            href={`/clinic/${params.clinicId}`}
            className={`flex items-center py-2 hover:text-primary ${
              pathname === `/clinic/${params.clinicId}`
                ? "text-primary"
                : "text-black"
            }`}
          >
            <BsFillFilePersonFill className="mr-2" size={20} />
            <span>Médicos</span>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/clinic/${params.clinicId}/settings`,
              query: { clinic: params.clinicId },
            }}
            className={`flex items-center py-2 hover:text-primary ${
              pathname.includes("/settings") ? "text-primary" : "text-black"
            }`}
          >
            <AiFillTool className="mr-2" size={20} />
            <span>Configurações</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/clinic/${params.clinicId}/plans`}
            className={`flex items-center py-2 hover:text-primary ${
              pathname === `/clinic/${params.clinicId}/plans`
                ? "text-primary"
                : "text-black"
            }`}
          >
            <BsShieldFillCheck className="mr-2" size={20} />
            <span>Planos</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
