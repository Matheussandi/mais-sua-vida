# Aplicativo Móvel

Este é o aplicativo móvel do projeto, desenvolvido para facilitar o agendamento de consultas para pacientes.

<p align="center">
    <img src="./src/assets/img/apresentation-mobile.jpg" alt="Apresentação" width="300" height="600">
</p>

## Demonstração
<p align="center">
  <video controls>
    <source src="./src/assets/video/apresentation-mobile.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

## Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Yup](https://github.com/jquense/yup)
- [React Hook Form](https://react-hook-form.com/)

## Instalação

Para iniciar o aplicativo mobile localmente, siga estas etapas:

1. Execute `npm install` para instalar as dependências.
2. Execute `npx expo start` para iniciar o servidor de desenvolvimento do Expo.
3. Use o Expo Go (Android) ou o aplicativo Expo Client (iOS) para escanear o código QR e visualizar o aplicativo em seu dispositivo móvel, ou pressione `a` para iniciar o emulador Android, ou `i` para iniciar o emulador iOS.

## Possíveis problemas

### Problema 1
"Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style"

### Solução

No arquivo .eslintrc, verifique se existe "linebreak-style", caso exista configure segundo seu sistema operacional.

Linux
/* linebreak-style: ["error", "unix"]*/

or 

Windows
/* linebreak-style: ["error", "windows"]*/


### Problema 2

Buscar dados da api.

### Solução

No arquivo api.ts, coloque o ip da sua máquina e a porta que o back-end está rodando. Por exemplo: 
```bash
192.168.0.1:3333 // Ip da máquina + porta
```

## Mais Detalhes

Para mais detalhes sobre a implementação e sobre o projeto em geral, consulte o README principal do repositório.

---

Este README fornece uma visão geral das tecnologias utilizadas no aplicativo do projeto +Sua Vida e instruções básicas para instalação e execução local.