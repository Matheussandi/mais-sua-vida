import { api } from "@/lib/api";

export async function getPatients() {
    const response = await api.get(`/paciente`);
    const patientes = await response.data;

    return patientes ||  [];
}