
## Iniciando o Projeto

Para começar a usar o projeto, siga os passos abaixo:

### 1. Instalando as dependências

Antes de tudo, é necessário instalar as dependências do projeto. Certifique-se de que você possui o Node.js e o npm (Node Package Manager) instalados em seu sistema.

No terminal, navegue até a pasta raiz do projeto e execute o seguinte comando:

```bash
npm install
```
Esse comando irá baixar e instalar todas as dependências necessárias para o projeto.

### 2. Env

Crie um arquivo .env e adione a url da api da imagem.

```ts
// Exemplo
NEXT_PUBLIC_API_IMAGE=http://localhost:(porta)/uploads
```

### 3. Executando o Projeto

```bash
npm run dev
```

Este comando irá iniciar o servidor de desenvolvimento. Por padrão, o projeto estará disponível na porta 3000. Para visualizá-lo, basta abrir seu navegador e acessar o seguinte endereço: [http://localhost:3000](http://localhost:3000).

### 4. Chamada à API
A chamada à API está no arquivo `api.ts` da pasta `lib`, onde são feitas as requisições e interações com o servidor.




