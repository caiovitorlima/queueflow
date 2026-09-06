const fila = [];
const historico = [];
let pessoaAtual = null;
let proximoId = 1;

const contadoresSenha = {
  Exame: 0,
  Consulta: 0,
  Retorno: 0
};

const prefixosCategoria = {
  Exame: "E",
  Consulta: "C",
  Retorno: "R"
};

function gerarSenha(categoria) {
  contadoresSenha[categoria]++;

  const numero = String(contadoresSenha[categoria]).padStart(3, "0");

  return `${prefixosCategoria[categoria]}${numero}`;
}

function validarPessoa(nome, categoria, preferencial) {
  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  if (!prefixosCategoria[categoria]) {
    throw new Error("Categoria inválida");
  }

  if (typeof preferencial !== "boolean") {
    throw new Error("Preferencial deve ser verdadeiro ou falso");
  }
}

function adicionarPessoa(nome, categoria, preferencial) {
  validarPessoa(nome, categoria, preferencial);

  const senha = gerarSenha(categoria);

  const pessoa = {
    id: proximoId,
    nome: nome.trim(),
    categoria: categoria,
    preferencial: preferencial,
    senha: senha,
    status: "AGUARDANDO"
  };

  proximoId++;

  fila.push(pessoa);

  return pessoa;
}

function listarFila() {
  return fila;
}

function chamarProximo() {
    const proximoPreferencial = fila.find(
      pessoa => pessoa.status === "AGUARDANDO" && pessoa.preferencial
    );
  
    const proximo = proximoPreferencial || fila.find(
      pessoa => pessoa.status === "AGUARDANDO"
    );
  
    if (!proximo) {
      throw new Error("Não há pessoas aguardando");
    }
  
    proximo.status = "CHAMADO";

    pessoaAtual = proximo;
  
    return proximo;
}

function finalizarAtendimento() {
    if (!pessoaAtual) {
      throw new Error("Não há atendimento em andamento");
    }
  
    pessoaAtual.status = "FINALIZADO";
  
    historico.push(pessoaAtual);
  
    const pessoaFinalizada = pessoaAtual;
  
    pessoaAtual = null;
  
    return pessoaFinalizada;
}

function obterPessoaAtual() {
    return pessoaAtual;
}
  
function listarHistorico() {
    return historico;
}

module.exports = {
    adicionarPessoa,
    listarFila,
    chamarProximo,
    finalizarAtendimento,
    obterPessoaAtual,
    listarHistorico
  };