import Image from "next/image";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";

import FotoMedico from "../../../assets/doctor1.png";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image: string;
}

export default function Doctors() {
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiologista",
      image: { FotoMedico },
    },
    {
      id: 2,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 3,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 4,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 5,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 6,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 7,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    {
      id: 8,
      name: "Dra. Jane Smith",
      specialization: "Dermatologista",
      image: { FotoMedico },
    },
    // Adicione mais médicos conforme necessário
  ];

  return (
    <div className="flex-grow p-10">
      <div className="bg-gray-50 p-7">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar médico"
              className="w-full rounded-lg border border-gray-300 p-2 pr-8"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FiSearch color="#0079FF" size={20} />
            </div>
          </div>
          <div className="flex items-center">
            <FiFilter className="mr-2" color="#0079FF" size={20} />
            <FiPlus className="mr-2" color="#0079FF" size={20} />
          </div>
        </div>

        {/* Listagem de médicos */}
        <div className="mt-7 border-t border-gray-300">
          <div className="-mx-2 mt-7 flex flex-wrap">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="mb-4 w-1/2 px-2 md:w-1/3 lg:w-1/4 xl:w-1/6"
              >
                <div className="h-150 w-200 flex flex-col items-center rounded-lg border border-gray-300">
                  <div className="flex h-32 w-full items-center justify-center rounded-lg bg-blue-300">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-center text-base font-bold">
                      {doctor.name}
                    </h3>
                    <p className="text-center text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
