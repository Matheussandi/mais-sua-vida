import { getServerSession } from "next-auth";
import { NewDoctorForm } from "../components/NewDoctorForm";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NewDoctor() {
  const session = await getServerSession(nextAuthOptions)
	const clinicId = session?.user.id

  if (!clinicId) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <NewDoctorForm clinicId={clinicId} />
    </div>
  );
}
