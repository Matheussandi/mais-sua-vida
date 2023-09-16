import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';
import { Especialization } from '../../models/EspecializationModel';
import { Clinic } from '../../models/ClinicModel';

export async function listDoctors(request: Request, response: Response){

	try{
		const medico = await Doctor.findAll({
			include:[
				{
					attributes: ['nome'],
					model: Especialization
				},
				{
					attributes: ['nome'],
					model: Clinic
				}
			],
		});
		response.status(200).json(medico);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}

}
