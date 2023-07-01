import { getDoctorById } from "../../services/get-doctor-by-id";

interface DoctorId {
  params: {
    id: string;
  };
}

interface DoctorProps {
  id: string;
  nome: string;
  sobrenome: string;
  specialization: string;
  image: string;
}

export default async function DoctorDetails({ params }: DoctorId) {
  const doctor: DoctorProps = await getDoctorById(params.id);

  console.log(doctor);

  return (
    <div>
      <h1>Id: {doctor.id}</h1>
      <h2>Nome: {doctor.nome}</h2>
    </div>
  );
}
