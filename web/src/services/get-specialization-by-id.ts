import { api } from "@/lib/api";

export async function getSpecializationById(id: string) {
    const response = await api.get(`/especializacao/${id}`);
    const specialization = await response.data;

    return specialization ||  [];
}