"use client";

import Link from "next/link";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

interface ClinicId {
  params: string;
}

interface DoctorProps {
  id: string;
  nome: string;
  sobrenome: string;
  doctorImage: string | null;
  idEspecializacao: string;
  idClinica: string;
  idMedico: string | null;
}

export default function DoctorList({ params }: ClinicId) {
  const [doctors, setDoctors] = useState<DoctorProps[]>([]);
  const [doctorsSearch, setDoctorsSearch] = useState("");

  // Filtra os médicos a partir da string digitada no input de busca
  const handleSearchDoctors = useCallback(async () => {
    try {
      const response = await api.get(`/clinica/${params}/medico`);
      const doctorSearch = doctorsSearch.toLocaleLowerCase();

      // Valida se os nomes dos médicos contêm o valor da variável doctorSearch
      const filteredDoctors = response.data.Doctors.filter(
        ({ nome }: DoctorProps) =>
          nome.toLocaleLowerCase().includes(doctorSearch)
      );

      setDoctors(filteredDoctors);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
    }
  }, [doctorsSearch, params]);

  // Carrega uma lista inicial de médicos
  const handleDoctorsListDefault = useCallback(async () => {
    try {
      const response = await api.get(`/clinica/${params}/medico`);
      setDoctors(response.data.Doctors);
    } catch (error) {
      console.error("Erro ao carregar lista de médicos:", error);
    }
  }, [params]);

  useEffect(() => {
    // Busca será realizada quando a string tiver mais de 2 caracteres
    const isSearch = doctorsSearch.length >= 2;

    if (isSearch) handleSearchDoctors();
    else handleDoctorsListDefault();
  }, [doctorsSearch, handleDoctorsListDefault, handleSearchDoctors, params]);

  // Renderiza a lista de médicos
  const renderDoctorsList = () => {
    if (!doctors) {
      // Retorna um elemento de carregamento ou uma mensagem de nenhum médico encontrado
      return <p>Carregando...</p>;
    }

    if (doctors.length === 0) {
      // Retorna uma mensagem de nenhum médico encontrado
      return <p>Nenhum médico encontrado.</p>;
    }

    return doctors.map((doctor) => (
      <div
        key={doctor.id}
        className="mb-4 w-1/2 px-2 md:w-1/3 lg:w-1/4 xl:w-1/6"
      >
        <Link
          href={{
            pathname: `/clinic/${params}/doctorSelected`,
            query: { doctor: doctor.id },
          }}
          className="h-150 w-200 flex flex-col items-center rounded-lg border border-gray-300"
        >
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-blue-300">
            {/* Sem imagem por enquanto */}
            {/*                     <Image
              src={doctor.image}
              alt={doctor.nome}
              width={50}
              height={50}
              className="h-50 w-50"
            /> */}
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-center text-base font-bold">
              {doctor.nome}
            </h3>
            {/*                     <p className="text-center text-sm text-gray-500">
              {doctor.idEspecializacao}
            </p> */}
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <div className="rounded bg-gray-50 p-7">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar médico"
              value={doctorsSearch}
              onChange={(e) => setDoctorsSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 pr-8 focus:border-primary focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FiSearch color="#0079FF" size={20} />
            </div>
          </div>
          <div className="flex items-center">
            <Link href={`/clinic/${params}/new`}>
              <FiPlus className="mr-2" color="#0079FF" size={20} />
            </Link>
          </div>
        </div>

        {/* Listagem de médicos */}
        <div className="mt-7 border-t border-gray-300">
          <div className="-mx-2 mt-7 flex flex-wrap">{renderDoctorsList()}</div>
        </div>
      </div>
    </div>
  );
}
