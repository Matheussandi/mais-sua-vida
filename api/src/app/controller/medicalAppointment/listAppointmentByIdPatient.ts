import { Request, Response } from 'express';

import { MedicalAppointment } from '../../models/MedicAppointmentModel';
import { Patient } from '../../models/PatientModel';
import { Doctor } from '../../models/DoctorModel';

export async function listAppointmentsByIdPatient(request: Request, response: Response){
	try{
		const { idPaciente } = request.params;

		const consulta = await MedicalAppointment.findAll({
            where: {
                idPaciente: idPaciente
            },
			include: [
				{
					attributes: ['nome'],
					model: Doctor
				},
				{
					attributes: ['nome'],
					model: Patient
				}
			]
		});
		response.status(200).json(consulta);
	}catch(eror){
		response.status(400).json({Error: 'Something went wrong'});
	}
}
