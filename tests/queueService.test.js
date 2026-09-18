let adicionarPessoa;

beforeEach(() => {
  jest.resetModules();

  const queueService = require("../src/services/queueService");

  adicionarPessoa = queueService.adicionarPessoa;
});

test("deve adicionar uma pessoa válida à fila", () => {
  const pessoa = adicionarPessoa(
    "Caio",
    "Exame",
    false
  );

  expect(pessoa).toEqual({
    id: 1,
    nome: "Caio",
    categoria: "Exame",
    preferencial: false,
    senha: "E001",
    status: "AGUARDANDO"
  });
});

test("deve rejeitar uma categoria inválida", () => {
  expect(() => {
    adicionarPessoa(
      "Caio",
      "Batata",
      false
    );
  }).toThrow("Categoria inválida");
});