import { Request, Response} from 'express';

import { Clinic } from '../../models/ClinicModel';


export async function listClinicById(request: Request, response:Response){
	try{
		const { id } = request.params;

		const clinic = await Clinic.findByPk(id);

		if(!clinic){
			response.status(404).json({Error: 'Clinic not found'});
		}

		response.status(201).json(clinic);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}

}
