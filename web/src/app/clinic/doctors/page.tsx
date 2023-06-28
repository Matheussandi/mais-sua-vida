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
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar médico"
              className="border border-gray-300 rounded-lg p-2 pr-8 w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiSearch color="#0079FF" size={20} />
            </div>
          </div>
          <div className="flex items-center">
            <FiFilter className="mr-2" color="#0079FF" size={20} />
            <FiPlus className="mr-2" color="#0079FF" size={20} />
          </div>
        </div>

        {/* Listagem de médicos */}
        <div className="border-t border-gray-300 mt-7">
          <div className="flex flex-wrap -mx-2 mt-7">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4"
              >
                <div className="border border-gray-300 rounded-lg h-150 w-200 flex flex-col items-center">
                  <div className="w-full h-32 rounded-lg bg-blue-300 flex items-center justify-center">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold mb-2 text-center">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
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
