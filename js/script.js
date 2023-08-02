const input = document.querySelector(".input-box input");
const taskList = document.querySelector(".task-list");
let toDoList = JSON.parse(localStorage.getItem("to-do-list"));

if (!toDoList) {
  toDoList = [];
}

function deleteTask(index) {
  toDoList.splice(index, 1);
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
  showTasks();
}

function outsideClick(event, element, html, callback) {
  html.classList.add("event-active");
  if (!element.contains(event.target)) {
    element.classList.remove("active");
    html.classList.remove("event-active");
    html.removeEventListener("click", callback);
  }
}

function showMenu(menu) {
  const menuToHidde = document.querySelector(".task-menu.active");
  const html = document.documentElement;
  if (menuToHidde) menuToHidde.classList.remove("active");
  menu.classList.add("active");

  const callback = (event) => {
    outsideClick(event, menu, html, callback);
  };

  if (!html.classList.contains("event-active"))
    html.addEventListener("click", callback);
}

function updateStatus(index, input) {
  if (input.checked) toDoList[index].status = "completed";
  else toDoList[index].status = "pending";
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}

function showTasks() {
  const emptyMsg = "Não há tarefas cadastradas aqui";
  let tasks = "";
  let isCompleted;
  toDoList.forEach((item, index) => {
    isCompleted = item.status === "completed" ? "checked" : "";
    tasks += `<li class="task">
                  <label for="${index}">
                    <input type="checkbox" id="${index}" onclick="updateStatus(${index}, this)" ${isCompleted}>
                    <p>${item.text}</p>
                  </label>
                  <div class="task-menu" onclick="showMenu(this)">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="settings">
                      <li>
                        <i class="uil uil-pen"></i>
                        <span>Editar</span>
                      </li>
                      <li onclick="deleteTask(${index})">
                        <i class="uil uil-trash-alt"></i>
                        <span>Deletar</span>
                      </li>
                    </ul>
                  </div>
                </li>`;
  });

  taskList.innerHTML = tasks || emptyMsg;
}

function saveTask(task) {
  toDoList.push(task);
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
  showTasks();
}

function createTask(value) {
  return { text: value, status: "pending" };
}

function init() {
  input.addEventListener("keyup", (event) => {
    let value = input.value;

    if (event.key === "Enter" && value.length > 0) {
      const task = createTask(value);
      saveTask(task);
    }
  });

  showTasks();
}

init();
