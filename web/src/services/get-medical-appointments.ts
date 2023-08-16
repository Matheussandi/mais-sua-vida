import { api } from "@/lib/api";

export async function getMedicalAppointments() {
    const response = await api.get(`/consultas`);
    const patientes = await response.data;

    return patientes ||  [];
}