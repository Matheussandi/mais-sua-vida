import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';
import { Especialization } from '../../models/EspecializationModel';

export async function listDoctorById(request: Request, response: Response){
	try{
		const { id } = request.params;

		const medico = await Doctor.findByPk(id, {
			include: [
				{
					attributes: ['nome'],
					model: Especialization
				}
			]
		});
		response.status(200).json(medico);
	}catch(eror){
		response.status(400).json({Error: 'Something went wrong'});
	}
}
