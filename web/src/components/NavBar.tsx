"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

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
              <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                Sobre
              </a>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                Clínicas
              </a>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                Pacientes
              </a>
            </li>
            <li className="p-4 text-xl hover:text-primary">
              <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                Contato
              </a>
            </li>
            <button className="bg-primary p-4 rounded-xl text-xl hover:bg-[#136edd] transition-colors duration-300">
              <a className="text-white font-semibold" href="/login">
                Entrar
              </a>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}