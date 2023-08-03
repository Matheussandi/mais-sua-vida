export interface Doctor{
    id: string,
	nome: string,
	sobrenome: string,
	CRM:  string,
	doctorImage: string,
	email: string,
	senha: string,
	sobre: string,
	experiencia: string,
	avaliacao:string,
	idEspecializacao: string,
	idClinica: string,
    especializacao: {
        nome: string
    }
}