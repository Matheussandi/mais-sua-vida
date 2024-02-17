import { Request, Response } from 'express';

import { Clinic } from '../../models/ClinicModel';

import bcrypt from 'bcrypt';
import fs from 'fs';

import { z } from 'zod';

const ClinicSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
  CNPJ: z.string().length(14),
  cidade: z.string(),
  estado: z.string(),
  CEP: z.string(),
  telefone: z.string().length(13)
});

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

		const result = ClinicSchema.safeParse({
			nome,
			email,
			senha,
			CNPJ,
			cidade,
			estado,
			CEP,
			telefone
		});

		if (!result.success) {
			return response.status(400).json(result.error);
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