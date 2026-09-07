require("dotenv").config();

const express = require("express");

const {
  validarTokenSecretaria
} = require("./middlewares/authMiddleware");

const {
  tratarErro
} = require("./middlewares/errorMiddleware");

const {
  adicionarPessoa,
  listarFila,
  chamarProximo,
  finalizarAtendimento,
  obterPessoaAtual,
  listarHistorico
} = require("./services/queueService");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));


app.post("/fila", (req, res) => {
  const { nome, categoria, preferencial } = req.body;

  const pessoa = adicionarPessoa(
    nome,
    categoria,
    preferencial
  );

  res.status(201).json(pessoa);
});


app.get("/fila", validarTokenSecretaria, (req, res) => {
  const fila = listarFila();

  res.json(fila);
});


app.post(
  "/fila/proximo",
  validarTokenSecretaria,
  (req, res) => {
    const pessoa = chamarProximo();

    res.json(pessoa);
  }
);


app.post(
  "/fila/finalizar",
  validarTokenSecretaria,
  (req, res) => {
    const pessoa = finalizarAtendimento();

    res.json(pessoa);
  }
);


app.get("/historico", validarTokenSecretaria, (req, res) => {
  const historico = listarHistorico();

  res.json(historico);
});


app.get("/fila/atual", (req, res) => {
  const pessoaAtual = obterPessoaAtual();

  res.json(pessoaAtual);
});


app.use(tratarErro);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});