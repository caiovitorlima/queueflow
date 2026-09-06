const areaLogin = document.getElementById("areaLogin");
const painelSecretaria = document.getElementById("painelSecretaria");

const campoToken = document.getElementById("token");
const erroLogin = document.getElementById("erroLogin");

const botaoEntrar = document.getElementById("botaoEntrar");
const botaoChamar = document.getElementById("botaoChamar");
const botaoFinalizar = document.getElementById("botaoFinalizar");
const botaoSair = document.getElementById("botaoSair");

const listaFila = document.getElementById("listaFila");
const listaHistorico = document.getElementById("listaHistorico");

const mensagemSecretaria =
  document.getElementById("mensagemSecretaria");


function obterToken() {
  return sessionStorage.getItem("secretaryToken");
}


async function fazerRequisicaoProtegida(url, opcoes = {}) {
  const token = obterToken();

  const headers = {
    ...opcoes.headers,
    "x-secretary-token": token
  };

  const resposta = await fetch(url, {
    ...opcoes,
    headers: headers
  });

  return resposta;
}


async function carregarFila() {
  const resposta =
    await fazerRequisicaoProtegida("/fila");

  if (!resposta.ok) {
    return;
  }

  const fila = await resposta.json();

  listaFila.innerHTML = "";

  const pessoasAguardando = fila.filter(
    pessoa => pessoa.status === "AGUARDANDO"
  );

  if (pessoasAguardando.length === 0) {
    listaFila.innerHTML = "<p>Ninguém aguardando.</p>";
    return;
  }

  pessoasAguardando.forEach((pessoa) => {
    listaFila.innerHTML += `
      <div class="item-fila">
        <strong>${pessoa.senha}</strong>
        - ${pessoa.nome}
        - ${pessoa.categoria}
        ${pessoa.preferencial ? "- Preferencial" : ""}
      </div>
    `;
  });
}


async function carregarHistorico() {
  const resposta =
    await fazerRequisicaoProtegida("/historico");

  if (!resposta.ok) {
    return;
  }

  const historico = await resposta.json();

  listaHistorico.innerHTML = "";

  if (historico.length === 0) {
    listaHistorico.innerHTML =
      "<p>Nenhum atendimento finalizado.</p>";

    return;
  }

  historico.forEach((pessoa) => {
    listaHistorico.innerHTML += `
      <div class="item-historico">
        <strong>${pessoa.senha}</strong>
        - ${pessoa.nome}
        - ${pessoa.categoria}
      </div>
    `;
  });
}


async function atualizarPainel() {
  await carregarFila();
  await carregarHistorico();
}


botaoEntrar.addEventListener("click", async () => {
  const tokenDigitado = campoToken.value;

  sessionStorage.setItem(
    "secretaryToken",
    tokenDigitado
  );

  const resposta =
    await fazerRequisicaoProtegida("/fila");

  if (!resposta.ok) {
    sessionStorage.removeItem("secretaryToken");

    erroLogin.textContent = "Token inválido.";

    return;
  }

  erroLogin.textContent = "";

  areaLogin.classList.add("oculto");
  painelSecretaria.classList.remove("oculto");

  atualizarPainel();
});


botaoChamar.addEventListener("click", async () => {
  const resposta =
    await fazerRequisicaoProtegida(
      "/fila/proximo",
      {
        method: "POST"
      }
    );

  const dados = await resposta.json();

  if (!resposta.ok) {
    mensagemSecretaria.textContent = dados.erro;
    return;
  }

  mensagemSecretaria.textContent =
    `${dados.senha} - ${dados.nome} chamado.`;

  atualizarPainel();
});


botaoFinalizar.addEventListener("click", async () => {
  const resposta =
    await fazerRequisicaoProtegida(
      "/fila/finalizar",
      {
        method: "POST"
      }
    );

  const dados = await resposta.json();

  if (!resposta.ok) {
    mensagemSecretaria.textContent = dados.erro;
    return;
  }

  mensagemSecretaria.textContent =
    `${dados.senha} - ${dados.nome} finalizado.`;

  atualizarPainel();
});


botaoSair.addEventListener("click", () => {
  sessionStorage.removeItem("secretaryToken");

  painelSecretaria.classList.add("oculto");
  areaLogin.classList.remove("oculto");

  campoToken.value = "";
});