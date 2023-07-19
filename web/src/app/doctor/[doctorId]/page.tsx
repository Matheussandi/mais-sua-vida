import Link from "next/link";
import { getDoctorById } from "../../../services/get-doctor-by-id";
import { MdModeEdit } from "react-icons/md";

interface DoctorId {
  params: {
    doctorId: string;
  };
}

interface DoctorProps {
  id: string;
  nome: string;
  sobrenome: string;
  CRM: string;
  especializacao: {
    nome: string;
  };
  image: string;
}

export default async function DoctorId({ params }: DoctorId) {
  const doctor: DoctorProps = await getDoctorById(params.doctorId);

  return (
    <div className="flex-grow p-10">
      <div className="relative rounded bg-gray-50 p-7">
        <div className="doctor-info">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold uppercase">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
              <p className="font-bold uppercase text-gray-500">
                {doctor.especializacao.nome}
              </p>
            </div>
            <Link
              href={{
                pathname: `/${params.doctorId}/edit`,
                query: params.doctorId,
              }}
            >
              <div className="rounded-full bg-primary p-2">
                <MdModeEdit color="#ffffff" />
              </div>
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-10">
            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                Sobre
              </h2>
              <p>Conteúdo da seção Sobre</p>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                Experiência
              </h2>
              <p>Conteúdo da seção Experiência</p>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                Formação
              </h2>
              <p>Conteúdo da seção Formação</p>
            </div>

            <div>
              <h2 className="border-b-2 border-gray-200 font-bold uppercase">
                CRM
              </h2>
              <p>{doctor.CRM}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}