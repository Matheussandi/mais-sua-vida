import { Request, Response } from 'express';

import { Clinic } from '../../models/ClinicModel';

import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';
import bcrypt from 'bcrypt';
import fs from 'fs';

export async function createClinic(request: Request, response: Response){
	try{
		const  clinicImage  = request.file?.filename;
		const {
			nome,
			email,
			senha,
			CNPJ,
			cidade,
			estado,
			CEP,
			telefone
		} = request.body;

		const fields = [
			{ value: nome, nome: 'Nome'},
			{ value: email, nome: 'E-mail'},
			{ value: senha, nome: 'Senha'},
			{ value: CNPJ, nome: 'CNPJ'},
			{ value: cidade, nome: 'Cidade'},
			{ value: estado, nome: 'Estado'},
			{ value: CEP, nome: 'CEP'},
			{ value: telefone, nome: 'Telefone'}
		];

		const erros = verifyEmpityFields(fields);

		if(Object.keys(erros).length > 0 ){
			return response.status(400).json(erros);
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);

		const clinic = await Clinic.create({
			clinicImage,
			nome,
			email,
			senha: encryptedPassword,
			CNPJ,
			cidade,
			estado,
			CEP,
			telefone
		});

		response.status(201).json(clinic);
	}catch( error ) {
		if(request.file){
			try{
				fs.unlinkSync(request.file.path);
			}catch(error){
				console.error('Something went wrong while deleting file');
			}
		}
		response.status(400).json({ Error: 'Something went wrong!'});
	}
}
