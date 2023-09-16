import { Request, Response} from 'express';
import { Patient } from '../../models/PatientModel';

import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';
import { deleteFile } from '../../../utils/fileUtils';

import path from 'path';
import bcrypt  from 'bcrypt';
import fs from 'fs';

export async function updatePatient(request: Request, response: Response){
	try{
		const { id } = request.params;

		const patientExists = await Patient.findByPk(id);

		if(!patientExists){
			return response.status(404).json({Erro: 'Patient not foud'});
		}

		if(patientExists.patientImage){
			try{
				const imagePath = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', 'patientImages', `${patientExists.patientImage}`);

				await deleteFile(imagePath);
			}catch(error){
				return response.json({Error: 'Unexpected error while updating image'});
			}
		}

		const patientImage  = request.file?.filename;

		const {
			nome,
			sobrenome,
			CPF,
			email,
			senha,
			telefone,
			dataNascimento,
			altura,
			peso
		} = request.body;

		const fields = [
			{ value: nome, nome: 'Nome'},
			{ value: sobrenome, nome: 'Sobrenome'},
			{ value: CPF, nome: 'CPF'},
			{ value: email, nome: 'E-mail'},
			{ value: senha, nome: 'Senha'},
			{ value: telefone, nome: 'Telefone'},
		];

		const erros = verifyEmpityFields(fields);

		if(Object.keys(erros).length > 0){
			return response.status(400).json(erros);
		}

		const encryptedPassword = await bcrypt.hash(senha, 10);

		const patient = await Patient.update({
			nome,
			sobrenome,
			patientImage,
			CPF,
			email,
			senha: encryptedPassword,
			telefone,
			dataNascimento,
			altura,
			peso
		},{
			where: {
				id: id
			}
		});

		response.status(201).json(patient);
	}catch(error){
		if(request.file){
			try{
				fs.unlinkSync(request.file.path);
			}catch(error){
				console.error('Something went wrong while deleting file');
			}
		}
		response.status(400).json({Error: 'Something went wrong!', error});
	}

}
