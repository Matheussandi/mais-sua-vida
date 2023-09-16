import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';

export async function listEspecializationDoctors(request: Request, response: Response){
	try{
		const { id } = request.params;

		const especializationDoctor = await Doctor.findAll({ where: { idEspecializacao: id}});

		response.status(200).json(especializationDoctor);
	}catch(error){
		response.status(400).json({Error: 'Something went wrong', error});
	}



}
