import DoctorList from "../components/DoctorsList";

interface ClinicId {
  params: {
    clinicId: string;
  };
}

export default function DoctorSelected({ params }: ClinicId) {
  return (
    <div className="flex-grow p-10">
      <DoctorList params={params.clinicId} />
    </div>
  );
}
