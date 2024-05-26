import { api } from "@/lib/api";

export async function getPatientById(patientId: string) {
    const response = await api.get(`/paciente/${patientId}`);
    
    const patient = await response.data;

    return patient;
}