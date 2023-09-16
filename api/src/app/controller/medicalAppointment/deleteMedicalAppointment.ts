import { Request, Response } from 'express';
import { MedicalAppointment } from '../../models/MedicAppointmentModel';

export async function deleteMedicalAppointment(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const appointment = await MedicalAppointment.findByPk(id);

    if (!appointment) {
      return response.status(404).json({ error: 'Medical appointment not found.' });
    }

    await appointment.destroy();

    response.sendStatus(204);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred while deleting the medical appointment.' });
  }
}