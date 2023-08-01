import { api } from "@/lib/api";

export async function getHistoryByPatientId(patientId: string) {
    const response = await api.get(`/historico/${patientId}/historico`);
    const history = await response.data;

    return history ||  [];
}