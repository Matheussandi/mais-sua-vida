"use client";

import Image from "next/image";
import { useState } from "react";

import LogoImg from "../../public/logo.png";

export function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.slice(1));

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
          <Image src={LogoImg} width={60} height={60} alt="+Sua Vida" />
        </a>

        <ul className="hidden sm:flex">
          <li className="p-4 hover:text-primary">
            <a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>
              Sobre
            </a>
          </li>
          <li className="p-4 hover:text-primary">
            <a href="#clinics" onClick={(e) => handleLinkClick(e, "#clinics")}>
              Clínicas
            </a>
          </li>
          <li className="p-4 hover:text-primary">
            <a href="#patients" onClick={(e) => handleLinkClick(e, "#patients")}>
              Pacientes
            </a>
          </li>
          <li className="p-4 hover:text-primary">
            <a href="#footer" onClick={(e) => handleLinkClick(e, "#footer")}>
              Contato
            </a>
          </li>
          <button className="bg-primary px-4 rounded-xl my-2 hover:bg-[#136edd] transition-colors duration-300">
            <a className="text-white font-semibold" href="/login">
              Entrar
            </a>
          </button>
        </ul>

        {/* Mobile Menu */}
        <div className="block sm:hidden z-60 ">
          <button className="bg-primary p-3 rounded-xl my-2 hover:bg-[#136edd] transition-colors duration-300">
            <a className="text-white font-semibold" href="/login">
              Entrar
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}