const formFila = document.getElementById("formFila");

const resultado = document.getElementById("resultado");

formFila.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;

  const categoriaSelecionada = document.querySelector(
    'input[name="categoria"]:checked'
  );

  const preferencial =
    document.getElementById("preferencial").checked;

  const resposta = await fetch("/fila", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      nome: nome,
      categoria: categoriaSelecionada.value,
      preferencial: preferencial
    })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    resultado.textContent = dados.erro;
    return;
  }

  resultado.innerHTML = `
    <h2>Sua senha</h2>
    <strong>${dados.senha}</strong>
    <p>${dados.nome}</p>
    <p>Aguarde ser chamado.</p>
  `;

  formFila.reset();
});