"use client";

import Link from "next/link";
import {
  FiUser,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { useCallback, useEffect, useState } from "react";

import { api } from "@/lib/api";
import Image from "next/image";

interface ClinicId {
  params: string | undefined;
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

interface SpecializationProps {
  id: string;
  nome: string;
}

export default function DoctorList({ params }: ClinicId) {
  const [doctors, setDoctors] = useState<DoctorProps[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationProps[]>([]);
  const [doctorsSearch, setDoctorsSearch] = useState("");
  const [page, setPage] = useState(1);

  const doctorsPerPage = 12;


  const fetchDoctors = useCallback(async () => {
    try {
      const response = await api.get(`/clinica/${params}/medico`);
      const doctorsData = response.data.Doctors;
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Erro ao carregar lista de médicos:", error);
    }
  }, [params]);

  const fetchSpecializations = useCallback(async () => {
    try {
      const response = await api.get("/especializacao");
      const specializationsData = response.data;
      setSpecializations(specializationsData);
    } catch (error) {
      console.error("Erro ao carregar lista de especializações:", error);
    }
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.nome.toLowerCase().includes(doctorsSearch.toLowerCase())
  );

  const startIndex = (page - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, [fetchDoctors, fetchSpecializations]);

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
            <Link href={`/clinic/new`}>
              <FiPlus className="mr-2" color="#0079FF" size={20} />
            </Link>
          </div>
        </div>

        {/* Listagem de médicos */}
        <div className="mt-7 border-t border-gray-300">
          <div className="mt-4 flex flex-wrap">
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => {
                const specialization = specializations.find(s => s.id === doctor.idEspecializacao);
                return (
                  <div
                    key={doctor.id}
                    className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
                  >
                    <Link
                      href={{
                        pathname: `/clinic/doctorSelected`,
                        query: { doctor: doctor.id },
                      }}
                      className="block rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                      <div className="h-40 w-full rounded-t-lg bg-blue-300">
                        {doctor.doctorImage ? (
                          <Image
                            src={`http://localhost:3333/uploads/${doctor.doctorImage}`}
                            alt={doctor.nome}
                            width={200}
                            height={200}
                            priority={true}
                            className="mx-auto object-cover h-full w-full rounded-t-lg"
                          />
                        ) : (
                          <>
                            <div className="flex">
                              <FiUser
                                size={160}
                                className="mx-6 my-auto"
                                color="white"
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-center text-base font-bold">
                          {doctor.nome}
                        </h3>
                        <p className="text-center flex-wrap text-sm text-gray-500">
                          {specialization ? specialization.nome : '-'}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
              })
            ) : (
              <p className="w-full text-center">Nenhum médico encontrado.</p>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="cursor-pointer rounded bg-primary px-3 py-1 text-white"
              >
                <FiChevronLeft size={20} />
              </button>
            )}
            <div className="mx-2">
              {page} de {totalPages}
            </div>
            {page < totalPages && (
              <button
                onClick={() => setPage(page + 1)}
                className="cursor-pointer rounded bg-primary px-3 py-1 text-white"
              >
                <FiChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
