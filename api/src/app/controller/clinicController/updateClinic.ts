import { Request, Response } from "express";
import { z } from 'zod';
import path from 'path';
import bcrypt from 'bcrypt';
import { Clinic } from "../../models/ClinicModel";
import { deleteFile } from "../../../utils/fileUtils";

const clinicUpdateSchema = z.object({
	nome: z.string(),
	email: z.string().email(),
	senha: z.string().min(8),
	CNPJ: z.string().length(14),
	telefone: z.string(),
	cidade: z.string(),
	estado: z.string(),
	CEP: z.string().length(8),
});

export async function updateClinic(request: Request, response: Response){
	try{
		const { id } = request.params;

		const clinicExists = await Clinic.findByPk(id);

		if(!clinicExists){
			return response.status(404).json({Error: 'Doctor not found '});
		}

		if(clinicExists.clinicImage){
			try{
				const imagePath = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', 'clinicImages', `${clinicExists.clinicImage}`);
				await deleteFile(imagePath);
			}catch(error){
				return response.json({Error: 'Unexpected error while updating image'});
			}
		}

		const clinicImage = request.file?.filename;

		const {
			nome,
			email,
			senha,
			CNPJ,
			telefone,
			cidade,
			estado,
			CEP,
		} = clinicUpdateSchema.parse(request.body);

		const encryptedPassword = await bcrypt.hash(senha, 10);

		const clinic = await Clinic.update({
			clinicImage,
			nome,
			senha: encryptedPassword,
			CNPJ,
			email,
			cidade,
			estado,
			CEP,
			telefone,
		},	{
			where: {
				id: id,
			}
		});

		return response.status(201).json(clinic);

	}catch(error){
		if (error instanceof z.ZodError) {
			return response.status(400).json({ error: error.errors });
		}

		return response.status(400).json({Erro: 'Something went wrong', error});
	}
}