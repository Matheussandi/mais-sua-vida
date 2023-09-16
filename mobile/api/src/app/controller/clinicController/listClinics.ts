import { Request, Response } from 'express';

import { Clinic } from '../../models/ClinicModel';

export async function listClinics(request: Request, response: Response){
	try{
		const clinicas = await Clinic.findAll();

		response.status(201).json(clinicas);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}

}
