import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { api } from "@/lib/api";
import { getServerSession } from "next-auth";

export async function getDoctorById(doctorId: string) {
    const session = await getServerSession(nextAuthOptions)

	const userId = session?.user.id;

    const response = await api.get(`/medico/${userId}`, {
        headers: {
            Authorization: `Bearer ${session?.token}`
        }
    });
    const doctor = await response.data;

    return doctor;
}