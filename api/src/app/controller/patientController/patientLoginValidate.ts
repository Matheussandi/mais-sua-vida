import { Request, Response } from 'express';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

import { Patient } from '../../models/PatientModel';

const comparePasswords = promisify(bcrypt.compare);

export async function patientLoginValidator(request: Request, response: Response){
	try{

		const { email, senha} = request.body;
		const validPatient = await Patient.findOne({ where: { email: email}});

		if(!validPatient){
			return response.status(404).json({Erro: 'Invalid E-mail'});
		}

		const validPassword = await comparePasswords(senha, validPatient.senha);

		if(!validPassword){
			return response.status(400).json({Error: 'Invalid Password'});
		}else {
			return response.status(200).json(validPatient);
		}

	}catch(error){
		return response.status(400).json({Error: 'Something went wrong'});
	}

}
