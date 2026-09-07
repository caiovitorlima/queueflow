QueueFlow

O QueueFlow é um MVP de sistema de gerenciamento de filas desenvolvido com Node.js, Express e JavaScript.

O projeto permite que clientes entrem em uma fila de atendimento, escolham uma categoria e informem se possuem atendimento preferencial. Cada pessoa recebe uma senha gerada de acordo com sua categoria.

Também existem uma tela de monitor, que mostra a pessoa chamada no momento, e uma área da secretaria, onde é possível visualizar a fila, chamar o próximo atendimento, finalizar atendimentos e consultar o histórico.

Tecnologias utilizadas

* Node.js
* Express
* JavaScript
* HTML
* CSS
* dotenv
* Git e GitHub

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

Refatorações realizadas

Após a primeira versão funcional do projeto, foi feito um diagnóstico de qualidade e algumas melhorias foram aplicadas.

As principais alterações foram:

* substituição de nomes genéricos de variáveis por nomes que representam melhor sua intenção;
* separação da renderização da fila em uma função própria;
* remoção de blocos de tratamento de erro duplicados nas rotas;
* criação de um middleware centralizado para tratamento de erros;
* adição de logs contendo o método HTTP, a rota e a mensagem do erro.

As alterações foram feitas procurando manter o mesmo funcionamento da versão inicial, melhorando principalmente a organização e a legibilidade do código.
