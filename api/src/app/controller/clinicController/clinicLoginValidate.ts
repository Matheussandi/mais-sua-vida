import { Request, Response } from 'express';
import { promisify } from 'util';
import bcrypt from 'bcrypt';

import { Clinic } from '../../models/ClinicModel';

const comparePasswords = promisify(bcrypt.compare);

export async function clinicLoginValidator(request: Request, response: Response){
	try{

		const { CNPJ, senha} = request.body;
		const validClinic = await Clinic.findOne({ where: { CNPJ: CNPJ}});

		if(!validClinic){
			response.status(404).json({Erro: 'Invalid CNPJ'});
		}

		const validPassword = await comparePasswords(senha, validClinic.senha);

		if(!validPassword){
			response.status(500).json({Error: 'Invalid Password'});
		}else {
			response.status(200).json({Clinic: validClinic});
		}

	}catch(error){
		response.status(500).json({Error: 'Something went wrong'});
	}

}
