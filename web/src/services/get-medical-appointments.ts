import { api } from "@/lib/api";

export async function getMedicalAppointments() {
    const response = await api.get(`/consultas`);

    const patients = await response.data;

    return patients ||  [];
}