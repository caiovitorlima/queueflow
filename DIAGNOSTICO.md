DIAGNÓSTICO DE QUALIDADE - QUEUEFLOW

O QueueFlow é um sistema simples de gerenciamento de filas que fiz como projeto inicial. Ele permite cadastrar pessoas em uma fila, separar atendimentos por categoria e prioridade, chamar a próxima pessoa e finalizar o atendimento. Também possui uma tela para o cliente, um monitor e uma área da secretaria.

Depois de terminar a primeira versão funcional, revisei o código procurando alguns pontos que poderiam ser melhorados com os conceitos de Clean Code vistos em aula.

1. Tratamento de erro repetido no server.js

No arquivo src/server.js existem algumas rotas que usam praticamente o mesmo bloco de try/catch.

Isso acontece, por exemplo, nas rotas para cadastrar uma pessoa, chamar o próximo da fila e finalizar um atendimento.

Em todas elas a lógica é parecida: a operação é executada dentro do try e, se acontecer algum erro, o catch retorna uma resposta com status 400 e a mensagem do erro.

Isso gera duplicação, porque se eu quiser mudar a forma como os erros são tratados futuramente, provavelmente teria que alterar várias rotas.

Uma possível melhoria seria criar um tratamento de erros mais centralizado, evitando repetir o mesmo código.

2. A função carregarFila faz mais de uma coisa

No arquivo public/secretaria.js, a função carregarFila é responsável por várias etapas ao mesmo tempo.

Ela faz a requisição para o servidor, recebe os dados, filtra as pessoas que estão aguardando e também monta o HTML que aparece na tela.

A função funciona, mas acaba ficando responsável tanto pela comunicação com o backend quanto pela apresentação dos dados.

Uma melhoria seria separar essas responsabilidades. Por exemplo, carregarFila poderia buscar os dados e outra função poderia ficar responsável por mostrar a fila na tela.

3. Algumas variáveis possuem nomes genéricos

Em alguns arquivos do frontend usei o nome dados para armazenar o resultado de uma resposta da API.

Por exemplo, dependendo da função, esses dados podem representar uma pessoa que acabou de entrar na fila, uma pessoa que foi chamada ou uma pessoa cujo atendimento foi finalizado.

O nome dados funciona, mas não explica muito bem o que existe naquela variável.

Uma melhoria seria utilizar nomes mais específicos, como pessoaCriada, pessoaChamada ou pessoaFinalizada, dependendo do contexto.

MÉTRICA ESTIMADA

Para ter uma métrica do código, analisei a função validarPessoa do arquivo src/services/queueService.js.

Essa função possui três estruturas if, usadas para verificar o nome, a categoria e o valor de preferencial.

Utilizando a estimativa de complexidade ciclomática como 1 + quantidade de decisões, a função possui:

1 + 3 = 4

Portanto, a complexidade ciclomática estimada da função é 4.

Apesar disso, não considero essa função muito complexa, porque as três verificações são simples e fazem parte da mesma responsabilidade, que é validar os dados de uma pessoa antes de colocá-la na fila.

CONCLUSÃO

Os principais pontos que pretendo melhorar na refatoração são a duplicação no tratamento de erros, a separação de responsabilidades em algumas funções e o uso de nomes mais claros para algumas variáveis.

A ideia é fazer essas alterações sem mudar o funcionamento principal do sistema, apenas deixando o código mais organizado e mais fácil de entender e manter.
