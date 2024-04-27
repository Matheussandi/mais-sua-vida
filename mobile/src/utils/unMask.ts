export function unMask(cpf: string) {
	return cpf.replace(/\D/g, '');
}