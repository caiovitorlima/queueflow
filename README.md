QueueFlow

O QueueFlow é um MVP de sistema de gerenciamento de filas desenvolvido com Node.js, Express e JavaScript.

O projeto permite que clientes entrem em uma fila de atendimento, escolham uma categoria e informem se possuem atendimento preferencial. Cada pessoa recebe uma senha gerada de acordo com sua categoria.

Também existem uma tela de monitor, que mostra a pessoa chamada no momento, e uma área da secretaria, onde é possível visualizar a fila, chamar o próximo atendimento, finalizar atendimentos e consultar o histórico.

Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- HTML
- CSS
- dotenv
- Jest
- Supertest
- ESLint
- Prettier
- Git e GitHub
- GitHub Actions

Como rodar o projeto localmente

É necessário ter Node.js e npm instalados.

1. Clone o repositório:

git clone https://github.com/caiovitorlima/queueflow

2. Entre na pasta do projeto:

cd queueflow

3. Instale as dependências:

npm install

4. Crie um arquivo .env na raiz do projeto.

Use o arquivo .env.example como referência e defina um token para a secretaria:

SECRETARY_TOKEN=seu_token

5. Inicie o servidor:

npm start

6. Abra no navegador:

Cliente:
http://localhost:3000

Monitor:
http://localhost:3000/monitor.html

Secretaria:
http://localhost:3000/secretaria.html

Funcionamento atual

O sistema mantém os dados em memória. Isso significa que a fila, o histórico e os contadores de senha são apagados quando o servidor é reiniciado.

A proteção da área da secretaria também é simples e utiliza um token armazenado em uma variável de ambiente. Essa solução foi utilizada por se tratar de um MVP.

Testes automatizados

O projeto possui testes unitários para as principais regras da fila e testes de integração para verificar o funcionamento da API.

Os testes foram desenvolvidos utilizando Jest e Supertest.

Para executar todos os testes:

npm test

Para executar os testes com relatório de cobertura:

npm run test:coverage

O projeto possui uma cobertura mínima de 60% das linhas configurada no Jest. Atualmente, a suíte possui 13 testes automatizados e cobertura geral de aproximadamente 89%.

Entre os cenários testados estão:

- cadastro de uma pessoa válida;
- validação de nome, categoria e atendimento preferencial;
- chamada normal e chamada prioritária;
- tentativa de chamar uma fila vazia;
- finalização de atendimento;
- tentativa de finalizar sem atendimento em andamento;
- cadastro de uma pessoa através da API;
- acesso autorizado e não autorizado às rotas da secretaria;
- tratamento de erro em uma requisição inválida.

Qualidade de código

O projeto utiliza ESLint para verificar possíveis problemas no código JavaScript.

Para executar a verificação:

npm run lint

Também é utilizado Prettier para manter a formatação dos arquivos consistente.

Para verificar se os arquivos estão formatados:

npm run format:check

Para aplicar automaticamente a formatação:

npm run format

Integração contínua

O projeto possui um pipeline de integração contínua configurado com GitHub Actions.

O workflow está localizado em:

.github/workflows/ci.yml

A cada push ou Pull Request, o pipeline executa automaticamente:

- instalação das dependências;
- testes automatizados;
- verificação da cobertura de testes;
- ESLint;
- verificação da formatação com Prettier.

Caso alguma dessas verificações apresente erro, o pipeline é marcado como falho.

Refatorações realizadas

Após a primeira versão funcional do projeto, foi feito um diagnóstico de qualidade e algumas melhorias foram aplicadas.

As principais alterações foram:

- substituição de nomes genéricos de variáveis por nomes que representam melhor sua intenção;
- separação da renderização da fila em uma função própria;
- remoção de blocos de tratamento de erro duplicados nas rotas;
- criação de um middleware centralizado para tratamento de erros;
- adição de logs contendo o método HTTP, a rota e a mensagem do erro;
- separação da configuração da aplicação Express da inicialização do servidor, facilitando os testes de integração.

As alterações foram feitas procurando manter o mesmo funcionamento da versão inicial, melhorando principalmente a organização, a legibilidade, a testabilidade e a confiabilidade do código.
