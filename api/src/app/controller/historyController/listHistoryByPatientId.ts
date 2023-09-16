import { Request, Response } from 'express';

import { History } from '../../models/HistoryModel';
import { Patient } from '../../models/PatientModel';
import { Doctor } from '../../models/DoctorModel';

export async function listHistoryByPatientId(request: Request, response: Response){
	try{
		const { idPaciente } = request.params;

		const historico = await History.findAll({
			where: {
				idPaciente: idPaciente
			},
			include: [
				{
					attributes: ['nome'],
					model: Patient
				},
				{
					attributes: ['nome'],
					model: Doctor
				}
			]
		});

		response.status(200).json(historico);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong in retrieving patient history'});
	}
}
