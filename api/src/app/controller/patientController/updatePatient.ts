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

		let encryptedPassword = '';
		const patientExists = await Patient.findByPk(id);

		if(!patientExists){
			return response.status(404).json({Erro: 'Patient not foud'});
		}

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

		const existingPassword = patientExists.senha;


		if(existingPassword === senha){
			encryptedPassword = existingPassword;
		}else {
			encryptedPassword = await bcrypt.hash(senha, 10);
		}

		const patientImage  = request.file?.filename;

	
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
		}).then((result: [number]) =>{
			if(result[0] === 1){
				Patient.findOne(
					{ where: {
						id: id
					}
				}).then((updatedPatient: any) => {
					return response.status(200).json(updatedPatient);
				})
				
			}else{
				response.status(400)
			}
		});

		
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