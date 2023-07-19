import { api } from "@/lib/api";

export async function getClinicById(clinicId: string) {
    const response = await api.get(`/clinica/${clinicId}`);
    const clinic = await response.data;

    return clinic;
}