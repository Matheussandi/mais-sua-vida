# Descrição
Esta é a API do +Sua Vida, nela teremos as rotas que serão acessadas pelos usuários e pelo sistema

# Instalação

1. Navegue até o diretório do projeto.
```bash
cd api
```

2. Instale as dependências.
```bash
npm install
```

3. Execute o comando para criar a pasta `dist`.
```bash
npm run build
```

4. No diretório raiz do projeto crie a pasta `upload` manualmente.


⚠️ Em caso de problemas de conexão com o banco de dados, siga estas etapas:

1. Certifique-se de que o banco de dados esteja iniciado.
2. Abra o arquivo index.ts e verifique a configuração do Sequelize
```typescript
sequelize.sync({ force: true }).then(() => {
    console.log('Tabelas sincronizadas');
}).catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
});
```

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