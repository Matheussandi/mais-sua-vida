import { Request, Response } from 'express';

import { Especialization } from '../../models/EspecializationModel';

export async function listEspecialization(request: Request, response: Response){
	try{

		const especializacoes = await Especialization.findAll({
			order: [['nome', 'ASC']]
		});
		response.status(200).json(especializacoes);

	}catch(error){
		response.status(400).json({Error: 'Something went wrong'});
	}

}
