import { Request, Response } from 'express';

import { Patient } from '../../models/PatientModel';


export async function listPatients(request: Request, response: Response){
	try{
		const patient = await Patient.findAll();

		response.status(200).json(patient);
	}catch(error){
		response.status(400).json('Something went wrong!');
	}

}
