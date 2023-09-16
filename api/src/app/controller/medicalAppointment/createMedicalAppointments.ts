import { Request, Response } from 'express';
import { MedicalAppointment } from '../../models/MedicAppointmentModel';
import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';

export async function createMedicalAppointments( request: Request, response: Response ) {
    try {
        const { data, hora, local, idPaciente, idMedico } = request.body;

        const infos = [
            { value: data, nome: 'Data' },
            { value: hora, nome: 'Hora' },
            { value: local, nome: 'Local' },
            { value: idPaciente, nome: 'idPacient' },
            { value: idMedico, nome: 'idMedico' },
        ];

        const erros = verifyEmpityFields(infos);

        if (Object.keys(erros).length > 0) {
            return response.status(400).json(erros);
        };

        const existingAppointment = await MedicalAppointment.findOne({
            where: {
                idPaciente,
                data,
                hora,
            },
        });

        if (existingAppointment) {
            return response.status(400).json({ error: 'There is already a medical appointment scheduled for this time.' });
        };

        const appointment = await MedicalAppointment.create({
            data,
            hora,
            local,
            idPaciente,
            idMedico,
        });

        response.status(201).json(appointment);

    } catch (error) {
        response.status(400).json({ error: 'Something went wrong'});
    }
}