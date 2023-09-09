import { api } from "@/lib/api";

export async function getSpecialization() {
    const response = await api.get(`/especializacao`);
    const specialization = await response.data;

    return specialization ||  [];
}