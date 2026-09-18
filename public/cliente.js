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

  const pessoaCriada = await resposta.json();

  if (!resposta.ok) {
    resultado.textContent = pessoaCriada
.erro;
    return;
  }

  resultado.innerHTML = `
    <h2>Sua senha</h2>
    <strong>${pessoaCriada.senha}</strong>
    <p>${pessoaCriada.nome}</p>
    <p>Aguarde ser chamado.</p>
  `;

  formFila.reset();
});