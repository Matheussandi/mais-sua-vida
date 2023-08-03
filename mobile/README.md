### Problema 
"Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style"

### Solução

No arquivo .eslintrc, verifique se existe "linebreak-style", caso exista configure segundo seu sistema operacional.

Linux
/* linebreak-style: ["error", "unix"]*/

or 

Windows
/* linebreak-style: ["error", "windows"]*/


## Problema 2

Buscar dados da api.

## Solução

No arquivo api.ts, coloque o ip da sua máquina e a porta que o back-end está rodando. Por exemplo: 

192.168.0.1:3333
Ip da máquina + porta