import { Request, Response} from 'express';

import { History } from '../../models/HistoryModel';

import { verifyEmpityFields } from '../../../utils/verifyEmptyFields';

export async function createHistory(request: Request, response: Response){
	try{
		const {
			data,
			descricao,
			idPaciente,
			idMedico
		} = request.body;

		const fields = [
			{ value: data, nome: 'Data'},
			{ value: descricao, nome: 'Descricao'},
			{ value: idPaciente, nome: 'idPaciente'},
			{ value: idMedico, nome: 'idMedico'},
		];

		const errors = verifyEmpityFields(fields);

		if(Object.keys(errors).length > 0){
			return response.status(500).json(errors);
		}

		const history = await History.create({
			data,
			descricao,
			idPaciente,
			idMedico
		});

		response.status(201).json(history);
	}catch(error){

		response.status(400).json({Error: 'Something went wrong!'});
	}
}

