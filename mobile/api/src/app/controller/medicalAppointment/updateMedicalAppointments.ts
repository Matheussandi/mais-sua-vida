import { Request, Response } from 'express';
import { MedicalAppointment } from '../../models/MedicAppointmentModel';
import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';

export async function updateMedicalAppointments( request: Request, response: Response ) {
    try {
        const { id } = request.params;

        const existingAppointment = await MedicalAppointment.findByPk(id);

        if (!existingAppointment) {
            response.status(404).json({ error: 'Medical appointment not found'});
        };

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

        const newAppointment = MedicalAppointment.update({
            data,
            hora,
            local,
            idPaciente,
            idMedico,
        }, {
            where: {
                id: id,
            }
        });

        return response.status(201).json({message: 'The medical appointment has been successfully updated.'});

    } catch (error) {
        response.status(400).json({ error: 'Something went wrong'});
    }
}