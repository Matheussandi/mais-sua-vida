import { api } from "@/lib/api";

export async function getPatients() {
    const response = await api.get(`/paciente`);

    const patients = await response.data;

    return patients ||  [];
}