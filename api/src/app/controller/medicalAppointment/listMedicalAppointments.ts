import { Request, Response } from 'express';

import { MedicalAppointment } from '../../models/MedicAppointmentModel';
import { Doctor } from '../../models/DoctorModel';
import { Patient } from '../../models/PatientModel';

export async function listMedicalAppointments (request: Request, response: Response){
	try{
		const consulta = await MedicalAppointment.findAll({
			include:[
				{
					attributes: ['nome'],
					model: Doctor
				},
				{
					attributes: ['nome', 'sobrenome'],
					model: Patient
				}
			],
		});
		response.status(200).json(consulta);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}

}