import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';

export async function listClinicDoctors(request: Request, response: Response){
	try{
		const { id } = request.params;

		const clinicDoctor = await Doctor.findAll({ where: { idClinica: id}});

		response.status(200).json({Doctors: clinicDoctor});
	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}



}
