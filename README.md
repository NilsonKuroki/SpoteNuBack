# SpoteNuBack

## Stack
Esse é um projeto de Backend feito utilizando NodeJS, Express, Typescript e MySQL. Além disso, ele segue uma arquitetura baseada em MVC, com 3 camadas simples:

1. Controller: responsável pela comunicação com agentes externos 
(como o Frontend)
2. Model: responsável pela representação das nossas entidades
3. Business: responsável pela lógica de negócio

## Sobre
Este projeto é um dos ultimos projetos que criei no curso de desenvolvimento web fullstack oferecido pela labenu!
A idéia era criar um projeto web fullstack usando como base o spotify.

## Guia
No desenvolvimento do backend, foi criado alguns endpoints para cadastro de usuários, os usuários foram dividos em três tipos, eles são: administradores, ouvintes e bandas(interessados em divulgar seu trabalho como artistas, solo ou não, criam uma conta do tipo banda).
Como criar uma aplicação completa demoraria muito mais que duas semanas, a aplicação foi focada no desenvolvimento de algumas funcionalidades que o administrador poderia ter(além do login e cadastro de qualquer usuário na aplicação). Algumas das apliacações do usuário administrador são:

1. Criar novas contas do tipo administrador;
2. Ter um local onde ele possa ter acesso a todos os usuários do tipo banda e possa aprovar esses usuários a divulgar seu trabalho no nosso sistema;
3. Existe mais uma funcionalidade que é gerenciamento de generos musicais, mas não foi implementada;

A aplicação do frontend foi feita a parte e você pode encontrar ela [aqui](https://github.com/NilsonKuroki/SpoteNuFront)

## Instruções para rodar localmente
1. `npm install` para instalar todas as dependências, rode este comando na pasta raiz do projeto através do terminal de comando;
2. `npm run start` para rodar localmente o projeto, rode este comando na pasta raiz do projeto através do terminal de comando, quando estiver rodando a aplicação, ela ficará aberta na porta 3001;
3. Para que possa visualizar as requisições acontecendo, o interessante é que você rode a parte do frontend junto, para que possa ter melhor a experiência da aplicação como um todo! Caso prefira rodar apenas o backend, poderá usar algum aplicativo que possa bater nos endpoints e ver o retorno da aplicação, um exemplo é o postman que é uma plataforma de colaboração para desenvolvimento de API's;

## Contato
[LinkedIn](https://www.linkedin.com/in/nilson-kuroki/)
[GitHub](https://github.com/NilsonKuroki)