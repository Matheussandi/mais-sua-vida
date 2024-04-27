export function maskCpf(cpf: string) {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function maskPhone(value: string) {
	return value
		.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/g, '($1) $2')
		.replace(/(\d)(\d{4})$/, '$1-$2');
}