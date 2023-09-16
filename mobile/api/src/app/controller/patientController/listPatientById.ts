import { Request, Response } from 'express';

import { Patient } from '../../models/PatientModel';

export async function listPatientById(request: Request, response: Response){
	try{
		const { id } = request.params;

		const patient = await Patient.findByPk(id);

		response.status(200).json(patient);
	}catch(erorr) {
		response.status(404).json({Erro: 'User not found'});
	}
}
