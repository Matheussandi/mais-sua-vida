import { api } from "@/lib/api";

export async function getDoctorsByClinicId(clinicId: string) {
    const response = await api.get(`/clinica/${clinicId}/medico`);
    const doctors = await response.data;

    return doctors;
}