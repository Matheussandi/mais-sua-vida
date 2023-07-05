import { getDoctorById } from "../../../../services/get-doctor-by-id";

interface DoctorId {
  params: {
    id: string;
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

export default async function DoctorDetails({ params }: DoctorId) {
  const doctor: DoctorProps = await getDoctorById(params.id);

  return (
    <div className="flex-grow p-10">
      <div className="rounded bg-gray-50 p-7">
        <div className="doctor-info">
          <h1 className="text-2xl font-extrabold uppercase">{`${doctor.nome} ${doctor.sobrenome}`}</h1>
          <p className="font-bold uppercase text-gray-500">
            {doctor.especializacao.nome}
          </p>
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
                Idiomas
              </h2>
              <p>Conteúdo da seção Idiomas</p>
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
