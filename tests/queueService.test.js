let adicionarPessoa;
let chamarProximo;
let finalizarAtendimento;
let obterPessoaAtual;
let listarHistorico;

beforeEach(() => {
  jest.resetModules();

  const queueService = require("../src/services/queueService");

  adicionarPessoa = queueService.adicionarPessoa;
  chamarProximo = queueService.chamarProximo;
  finalizarAtendimento = queueService.finalizarAtendimento;
  obterPessoaAtual = queueService.obterPessoaAtual;
  listarHistorico = queueService.listarHistorico;
});

test("deve adicionar uma pessoa válida à fila", () => {
  const pessoa = adicionarPessoa("Caio", "Exame", false);

  expect(pessoa).toEqual({
    id: 1,
    nome: "Caio",
    categoria: "Exame",
    preferencial: false,
    senha: "E001",
    status: "AGUARDANDO",
  });
});

test("deve rejeitar uma categoria inválida", () => {
  expect(() => {
    adicionarPessoa("Caio", "Batata", false);
  }).toThrow("Categoria inválida");
});

test("deve rejeitar um nome vazio", () => {
  expect(() => {
    adicionarPessoa("   ", "Exame", false);
  }).toThrow("Nome é obrigatório");
});

test("deve rejeitar preferencial que não seja booleano", () => {
  expect(() => {
    adicionarPessoa("Caio", "Exame", "sim");
  }).toThrow("Preferencial deve ser verdadeiro ou falso");
});

test("deve chamar a primeira pessoa quando não há preferencial", () => {
  adicionarPessoa("Joao", "Exame", false);

  adicionarPessoa("Pedro", "Retorno", false);

  const pessoaChamada = chamarProximo();

  expect(pessoaChamada.nome).toBe("Joao");
  expect(pessoaChamada.status).toBe("CHAMADO");
});

test("deve chamar uma pessoa preferencial antes de uma pessoa normal", () => {
  adicionarPessoa("Joao", "Exame", false);

  adicionarPessoa("Maria", "Consulta", true);

  const pessoaChamada = chamarProximo();

  expect(pessoaChamada.nome).toBe("Maria");
  expect(pessoaChamada.status).toBe("CHAMADO");
});

test("deve gerar erro ao chamar uma fila vazia", () => {
  expect(() => {
    chamarProximo();
  }).toThrow("Não há pessoas aguardando");
});

test("deve finalizar o atendimento atual", () => {
  adicionarPessoa("Caio", "Exame", false);

  chamarProximo();

  const pessoaFinalizada = finalizarAtendimento();

  expect(pessoaFinalizada.status).toBe("FINALIZADO");

  expect(obterPessoaAtual()).toBeNull();

  expect(listarHistorico()).toHaveLength(1);
});

test("deve gerar erro ao finalizar sem atendimento em andamento", () => {
  expect(() => {
    finalizarAtendimento();
  }).toThrow("Não há atendimento em andamento");
});
