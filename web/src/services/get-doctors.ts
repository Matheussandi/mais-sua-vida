import { api } from "@/lib/api";

export async function getDoctors() {
    const response = await api.get(`/medico`);
    const doctors = await response.data;

    return doctors ||  [];
}