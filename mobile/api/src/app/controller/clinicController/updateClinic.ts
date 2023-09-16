import { Request, Response } from 'express';
import path from 'path';

import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';
import { deleteFile } from '../../../utils/fileUtils';
import bcrypt from 'bcrypt';

import { Clinic } from '../../models/ClinicModel';

export async function updateClinic(request: Request, response: Response){
	try{
		const { id } = request.params;


		const clinicExists = await Clinic.findByPk(id);

		if(!clinicExists){
			response.status(404).json({Error: 'Doctor not found '});
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
		} = request.body;

		const fields = [
			{ value: nome, nome: 'Nome'},
			{ value: email, nome: 'E-mail'},
			{ value: senha, nome: 'Senha'},
			{ value: CNPJ, nome: 'CNPJ'},
			{ value: cidade, nome: 'Senha'},
			{ value: estado, nome: 'Senha'},
			{ value: CEP, nome: 'Senha'},
			{ value: telefone, nome: 'Telefone'},
		];

		const erros = verifyEmpityFields(fields);

		if(Object.keys(erros).length > 0) {
			return response.status(400).json(erros);
		}

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
		response.status(400).json({Erro: 'Something went wrong', error});
	}
}



