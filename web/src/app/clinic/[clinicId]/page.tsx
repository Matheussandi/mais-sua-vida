import Link from "next/link";
import { getDoctorsByClinicId } from "@/services/get-doctors-by-clinic-id";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

interface ClinicId {
  params: {
    clinicId: string;
  };
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

interface DoctorsProps {
  Doctors: DoctorProps[];
}

export default async function DoctorSelected({ params }: ClinicId) {
  const doctors: DoctorsProps = await getDoctorsByClinicId(params.clinicId);

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar médico"
              className="w-full rounded-lg border border-gray-300 p-2 pr-8 focus:border-primary focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FiSearch color="#0079FF" size={20} />
            </div>
          </div>
          <div className="flex items-center">
            <Link href={`/clinic/${params.clinicId}/new`}>
              <FiPlus className="mr-2" color="#0079FF" size={20} />
            </Link>
          </div>
        </div>

        {/* Listagem de médicos */}
        <div className="mt-7 border-t border-gray-300">
          <div className="-mx-2 mt-7 flex flex-wrap">
            {doctors.Doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="mb-4 w-1/2 px-2 md:w-1/3 lg:w-1/4 xl:w-1/6"
              >
                <Link
                  href={{
                    pathname: `/clinic/${params.clinicId}/doctorSelected`,
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
