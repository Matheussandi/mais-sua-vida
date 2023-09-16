export function verifyEmpityFields(fields: {value: string, nome: string }[]){
	const erros: { [key: string]: string} = {};

	for (const field of fields){
		if(!field.value){
			erros[field.nome] = `${field.nome} is required`;
		}
	}

	return erros;
}
