let listElements = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

// Carrega tarefas do localStorage, ou inicia com array vazio
let tarefas = localStorage.getItem("@listaTarefa")
  ? JSON.parse(localStorage.getItem("@listaTarefa"))
  : [];

// Renderiza todas as tarefas na tela
function renderTarefas() {
  listElements.innerHTML = "";

  tarefas.forEach((todo, index) => {
    let liElement = document.createElement("li");
    let tarefaText = document.createTextNode(todo);

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.textContent = " Excluir";

    linkElement.addEventListener("click", function () {
      deletarTarefa(index);
    });

    liElement.appendChild(tarefaText);
    liElement.appendChild(linkElement);
    listElements.appendChild(liElement);
  });
}

// Adiciona nova tarefa à lista
function adicionarTarefa() {
  if (inputElement.value.trim() === "") {
    alert("Por favor, digite uma tarefa.");
    return;
  }

  let novaTarefa = inputElement.value.trim();
  tarefas.push(novaTarefa);
  inputElement.value = "";

  renderTarefas();
  salvarDados();
}

// Deleta tarefa pelo índice
function deletarTarefa(index) {
  tarefas.splice(index, 1);
  renderTarefas();
  salvarDados();
}

// Salva tarefas no localStorage
function salvarDados() {
  localStorage.setItem("@listaTarefa", JSON.stringify(tarefas));
}

// Escuta o clique no botão de adicionar
buttonElement.addEventListener("click", adicionarTarefa);

// Renderiza tarefas salvas assim que a página carrega
renderTarefas();
