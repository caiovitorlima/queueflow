const chamadaAtual = document.getElementById("chamadaAtual");

async function atualizarMonitor() {
  try {
    const resposta = await fetch("/fila/atual");

    const pessoa = await resposta.json();

    if (!pessoa) {
      chamadaAtual.innerHTML = `
        <p>Aguardando próxima chamada...</p>
      `;

      return;
    }

    chamadaAtual.innerHTML = `
      <div class="senha-monitor">${pessoa.senha}</div>
      <div class="nome-monitor">${pessoa.nome}</div>
    `;
  } catch (erro) {
    chamadaAtual.innerHTML = `
      <p>Não foi possível atualizar o monitor.</p>
    `;
  }
}

atualizarMonitor();

setInterval(atualizarMonitor, 2000);