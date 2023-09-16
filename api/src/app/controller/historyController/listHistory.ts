import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';
import { History } from '../../models/HistoryModel';
import { Patient } from '../../models/PatientModel';

export async function listHistory(request: Request, response: Response){

	try{
		const historicos = await History.findAll({
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
		response.status(200).json(historicos);
	}catch(error){
		response.status(400).json({Erro: 'Something went wrong'});
	}

}
