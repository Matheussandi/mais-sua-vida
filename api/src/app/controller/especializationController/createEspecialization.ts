import { Request, Response } from 'express';

import { Especialization } from '../../models/EspecializationModel';

export async function createEspecialization(request: Request, response: Response){
	try{
		const { nome } = request.body;

		if(!nome) {
			return response.status(400).json({
				error: 'Name is required'
			});
		}

		const especializacao = await Especialization.create( { nome });

		response.status(201).json(especializacao);
	}catch( error ) {
		console.log(error);
		response.status(400).json({Error: 'Somethinw went wrong!'});
	}
}




