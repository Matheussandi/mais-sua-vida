import { Request, Response } from 'express';

import { Doctor } from '../../models/DoctorModel';

import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';
import  bcrypt  from 'bcrypt';
import fs from 'fs';


export async function createDoctor(request: Request, response: Response){
	try{
		const doctorImage = request.file?.filename;
		const {
			nome,
			sobrenome,
			email,
			senha,
			sobre,
			experiencia,
			CRM,
			idEspecializacao,
			idClinica
		} = request.body;

		const fields = [
			{ value: nome, nome: 'Nome'},
			{ value: sobrenome, nome: 'Sobrenome'},
			{ value: email, nome: 'E-mail'},
			{ value: senha, nome: 'Senha'},
			{ value: CRM, nome: 'CRM'},
			{ value: idEspecializacao, nome: 'idEspecializacao'}
		];

		const erros = verifyEmpityFields(fields);

		if(Object.keys(erros).length > 0) {
			return response.status(400).json(erros);
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);


		const doctor = await Doctor.create({
			nome,
			sobrenome,
			CRM,
			doctorImage,
			email,
			senha: encryptedPassword,
			sobre,
			experiencia,
			idEspecializacao,
			idClinica
		});

		response.status(201).json(doctor);
	}catch(error){

		if(request.file){
			try{
				fs.unlinkSync(request.file.path);
			}catch(error){
				console.error('Something went wrong while deleting file');
			}
		}
		response.status(400).json({Erro: 'Something went wrong'});
	}

}
