import { api } from "@/lib/api";

export async function getDoctorById(doctorId: string) {
    const response = await api.get(`/medico/${doctorId}`);
    const doctor = await response.data;

    return doctor;
}