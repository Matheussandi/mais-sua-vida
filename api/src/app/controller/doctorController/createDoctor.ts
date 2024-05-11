import { Request, Response } from "express";
import bcrypt from "bcrypt";
import fs from 'fs';
import { z } from 'zod';
import { Doctor } from "../../models/DoctorModel";

const doctorCreateSchema = z.object({
	nome: z.string(),
	sobrenome: z.string(),
	email: z.string().email(),
	senha: z.string().min(6),
	sobre: z.string().optional(),
	experiencia: z.string(),
	CRM: z.string(),
	idEspecializacao: z.string(),
	idClinica: z.string(),
});

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
			idClinica,
		} = doctorCreateSchema.parse(request.body);

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
		if (error instanceof z.ZodError) {
			return response.status(400).json({ error: error.errors });
		}

		if(request.file){
			try{
				fs.unlinkSync(request.file.path);
			}catch(error){
				console.error('Something went wrong while deleting file');
			}
		}
		response.status(400).json({Erro: 'Something went wrong', error});
	}
}