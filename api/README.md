# API

Esta é a API do projeto, nela teremos as rotas que serão acessadas pelos usuários e pelo sistema

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Pré-requisitos
Docker: Certifique-se de ter o Docker instalado em sua máquina.

## Variáveis de Ambiente

1. Na raiz do projeto, crie um novo arquivo chamado .env.

2. Abra o arquivo .env e adicione as seguintes variáveis de ambiente:

```bash
DB_HOST=<seu_host_do_banco_de_dados>
DB_PORT=<sua_porta_do_banco_de_dados>
DB_USER=<seu_usuário_do_banco_de_dados>
DB_PASSWORD=<sua_senha_do_banco_de_dados>
DB_NAME=<seu_nome_do_banco_de_dados>
JWT_SECRET=<sua_chave_secreta_para_jwt>
```

## Instalação

1. Instale as dependências.

```bash
npm install
```

2. Execute o comando para criar a pasta `dist`.

```bash
npm run build
```

3. No diretório raiz do projeto crie a pasta `upload` manualmente.

4. Inicie o Docker e execute o seguinte comando para iniciar o banco de dados:

```bash
docker-compose up
```

⚠️ Em caso de problemas de conexão com o banco de dados, siga estas etapas:

1. Certifique-se de que o banco de dados esteja iniciado.
2. Abra o arquivo index.ts e verifique a configuração do Sequelize

```typescript
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tabelas sincronizadas");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });
```

## Nota
Em breve, estaremos adicionando o [Swagger](https://swagger.io/) a este projeto para facilitar a documentação e o teste da API.