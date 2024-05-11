import { EditClinicForm } from "../components/EditClinicForm";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(nextAuthOptions)
  const clinicId = session?.user.id

  if (!clinicId) {
    return null;
  }

  return (
    <EditClinicForm id={clinicId} />
  );
}
