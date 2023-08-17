"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import LogoImg from "../../public/logo.png";

export function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image src={LogoImg} width={60} height={60} alt="+Sua Vida" />
        </Link>

        <ul className="hidden sm:flex">
          <li className="p-4 hover:text-primary">
            <Link href="#about">Sobre</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="#clinics">Clínicas</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="#patients">Pacientes</Link>
          </li>
          <li className="p-4 hover:text-primary">
            <Link href="#footer">Contato</Link>
          </li>
          <button className="bg-primary px-4 rounded-xl my-2 hover:bg-[#136edd] transition-colors duration-300">
            <Link className="text-white font-semibold" href="/login">
              Entrar
            </Link>
          </button>
        </ul>

        {/* Mobile Button */}
        <div onClick={toggleNavbar} className="block sm:hidden z-10 ">
          {expanded ? (
            <AiOutlineClose size={20} color="#0079FF" />
          ) : (
            <AiOutlineMenu size={20} color="#0079FF" />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={
            expanded
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-transparent text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-transparent text-center ease-in duration-300"
          }
        >
          <ul>
            <li className="p-4 text-xl hover:text-primary">
              <Link href="/">Sobre</Link>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <Link href="/">Clínicas</Link>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <Link href="/">Pacientes</Link>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <Link href="/">Contato</Link>
            </li>
            <button className="bg-primary p-4 rounded-xl text-xl hover:bg-[#136edd] transition-colors duration-300">
              <Link className="text-white font-semibold" href="/login">
                Entrar
              </Link>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
