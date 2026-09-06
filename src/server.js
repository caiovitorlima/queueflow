const express = require("express");

const { adicionarPessoa, listarFila, chamarProximo, finalizarAtendimento, obterPessoaAtual, listarHistorico } = require("./services/queueService");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("QueueFlow está funcionando!");
});

app.post("/fila", (req, res) => {
  try {
    const { nome, categoria, preferencial } = req.body;

    const pessoa = adicionarPessoa(nome, categoria, preferencial);

    res.status(201).json(pessoa);
  } catch (erro) {
    res.status(400).json({
      erro: erro.message
    });
  }
});

app.get("/fila", (req, res) => {
    const fila = listarFila();
  
    res.json(fila);
});

app.post("/fila/proximo", (req, res) => {
    try {
      const pessoa = chamarProximo();
  
      res.json(pessoa);
    } catch (erro) {
      res.status(400).json({
        erro: erro.message
      });
    }
  });

app.post("/fila/finalizar", (req, res) => {
    try {
      const pessoa = finalizarAtendimento();
  
      res.json(pessoa);
    } catch (erro) {
      res.status(400).json({
        erro: erro.message
      });
    }
    });


app.get("/historico", (req, res) => {
        const historico = listarHistorico();
      
        res.json(historico);
    });
    
app.get("/fila/atual", (req, res) => {
    const pessoaAtual = obterPessoaAtual();
  
    res.json(pessoaAtual);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});