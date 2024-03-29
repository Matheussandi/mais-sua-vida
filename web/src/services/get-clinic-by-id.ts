import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { api } from "@/lib/api";
import { getServerSession } from "next-auth";

export async function getClinicById(clinicId: string) {
    const session = await getServerSession(nextAuthOptions)

	const userId = session?.user.id;


    const response = await api.get(`/clinica/${userId}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`
        }
    });
    const clinic = await response.data;

    return clinic;
}