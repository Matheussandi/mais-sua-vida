import { Request, Response } from 'express';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

import { Doctor } from '../../models/DoctorModel';

const comparePasswords = promisify(bcrypt.compare);

export async function doctorLoginValidate(request: Request, response: Response){
	try{
		const {
			CRM,
			senha
		} = request.body;

		const validDoctor = await Doctor.findOne({where: { CRM: CRM } });

		if(!validDoctor){
			response.status(500).json({Error: 'Invalid CRM'});
		}

		const validPassword = await comparePasswords(senha, validDoctor.senha);

		if(!validPassword){
			response.status(500).json({Error: 'Invalid Password'});
		}else{
			response.status(200).json({Doctor: validDoctor});
		}

	}catch(error){
		response.status(500).json({error});
	}
}
