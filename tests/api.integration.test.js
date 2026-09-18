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


test("GET /fila deve bloquear acesso sem token", async () => {
  const resposta = await request(app)
    .get("/fila");

  expect(resposta.status).toBe(401);

  expect(resposta.body).toEqual({
    erro: "Acesso não autorizado"
  });
});


test("GET /fila deve permitir acesso com token válido", async () => {
  const resposta = await request(app)
    .get("/fila")
    .set("x-secretary-token", "token-teste");

  expect(resposta.status).toBe(200);
  expect(resposta.body).toEqual([]);
});


test("POST /fila deve retornar erro para categoria inválida", async () => {
  const resposta = await request(app)
    .post("/fila")
    .send({
      nome: "Caio",
      categoria: "Batata",
      preferencial: false
    });

  expect(resposta.status).toBe(400);

  expect(resposta.body).toEqual({
    erro: "Categoria inválida"
  });
});