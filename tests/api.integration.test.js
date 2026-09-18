const request = require("supertest");

let app;

beforeEach(() => {
  jest.resetModules();

  process.env.SECRETARY_TOKEN = "token-teste";

  app = require("../src/app");
});


test("POST /fila deve cadastrar uma pessoa pela API", async () => {
  const resposta = await request(app)
    .post("/fila")
    .send({
      nome: "Caio",
      categoria: "Exame",
      preferencial: false
    });

  expect(resposta.status).toBe(201);

  expect(resposta.body).toEqual({
    id: 1,
    nome: "Caio",
    categoria: "Exame",
    preferencial: false,
    senha: "E001",
    status: "AGUARDANDO"
  });
});