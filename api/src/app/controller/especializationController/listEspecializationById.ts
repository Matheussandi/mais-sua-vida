import { Request, Response } from 'express';

import { Especialization } from '../../models/EspecializationModel';

export async function listEspecializationById(request: Request, response:Response){
	try{
		const { id } = request.params;

		const especializacao = await Especialization.findByPk(id);
		response.status(200).json(especializacao);

	}catch(error){
		response.status(404).json({ Error: 'Especialization not found'});
	}
}
