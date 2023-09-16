# TCC
![Logo do Projeto](./project-image.png)

# Descrição
Esta é a API do +Sua Vida, nela teremos as rotas que serão acessadas pelos usuários e pelo sistema

# Informações e dicas

Para versionamento e controle desta API estaremos utilizando o GIT.

	Principais comandos:
		1. git status (Verifica o status dos arquivos (Adicionado ao versionamento ou não))

		2. git add <Nome do Arquivo> (Adiciona um por um dos não listados ao versionamento)
			-git add . (Adiciona todos os arquivos não listados ao versionamento)

		3. git commit -a -m "msg" (Comando para enviar as mudanças realizadas)
			-a (Significa que ele vai aceitar todo tipo de arquivo)
			-m (Para informar qual mudança você realizou com essa commit)

		4. git config (Será necessario configurar duas informações para realizar o commit)
				-git config --global user.email "Seu email"
				-git config --global user.name "Seu nome"

		5. git branch (Para verificar as branchs/ramificação do código)

		6. git checkout (Nome da branch - para trocar de branch)

		7. git push (Para enviar para o Git)

# Instalação

1. Para instalar o projeto basta realizar a execução do Yarn no terminal
2. Para eventuais problemas com a conexão com o banco de dados realizar a seguinte rotina
	- Verificar se o banco de dados está startado.
	- Trocar no index.ts o campo { alter: true } para { force: true }. Essa ação vai realizar um drop de todas as tabelas
		e recriar do zero.

# Techs Utilizadas no Projeto

- Git
- PostgreSQL
- Node.Js
- TypeScript

# Bibliotecas

- Sequelize
- Express
- Nodemon
- Eslint
- Multer

