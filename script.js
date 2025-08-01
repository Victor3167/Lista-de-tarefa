let listElements = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#btn-registrar");

let tarefas = localStorage.getItem("@listaTarefa")
  ? JSON.parse(localStorage.getItem("@listaTarefa"))
  : [];

function renderTarefas() {
  listElements.innerHTML = "";

  tarefas.forEach((todo, index) => {
    let liElement = document.createElement("li");
    liElement.className = todo.concluida ? "completed" : "";

    let spanTexto = document.createElement("span");
    spanTexto.textContent = todo.texto;

    // Botão Excluir com ícone
    let btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 3V4H4V6H5V20A2 2 0 0 0 7 22H17A2 2 0 0 0 19 20V6H20V4H15V3H9ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z"/></svg>
      Excluir
    `;
    btnExcluir.className = "btn-excluir";
    btnExcluir.addEventListener("click", function () {
      deletarTarefa(index);
    });

    // Botão Concluir com ícone
    let btnConcluir = document.createElement("button");
    btnConcluir.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"/></svg>
      ${todo.concluida ? "Desfazer" : "Concluir"}
    `;
    btnConcluir.className = "btn-concluir";
    btnConcluir.addEventListener("click", function () {
      toggleConclusao(index);
    });

    liElement.appendChild(spanTexto);
    liElement.appendChild(btnConcluir);
    liElement.appendChild(btnExcluir);

    listElements.appendChild(liElement);
  });
}

function adicionarTarefa() {
  if (inputElement.value.trim() === "") {
    alert("Por favor, digite uma tarefa.");
    return;
  }

  let novaTarefa = {
    texto: inputElement.value.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  inputElement.value = "";

  renderTarefas();
  salvarDados();
}

function toggleConclusao(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  renderTarefas();
  salvarDados();
}

function deletarTarefa(index) {
  tarefas.splice(index, 1);
  renderTarefas();
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("@listaTarefa", JSON.stringify(tarefas));
}

buttonElement.addEventListener("click", adicionarTarefa);

renderTarefas();
