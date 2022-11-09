// Selectors
const todoInput = document.querySelector(".todo-form__input");
const todoButton = document.querySelector(".todo-form__button");
const todo = document.querySelector(".todo");
const filterOption = document.querySelector(".todo-form__filter-todo");
const colorPicker = document.querySelector("#colorpicker");
const body = document.body;

// Event Listeners
document.addEventListener("DOMContentLoaded", getFromLocalStorage);
todoButton.addEventListener("click", addTodo);
todo.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);
colorPicker.addEventListener("input", changeBackgroundColor);

// Functions
function addTodo(event) {
  // prevent form submition
  event.preventDefault();

  // create .todo__list div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__item");

  // create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo__text");
  todoDiv.appendChild(newTodo);

  // get text from input & check for spaces
  if (todoInput.value.trim()) {
    newTodo.innerText = todoInput.value;
  } else {
    return;
  }

  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("todo__complete-button");
  todoDiv.appendChild(completedButton);

  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("todo__trash-button");
  todoDiv.appendChild(trashButton);

  // Append to <ul class="todo"></ul>
  todo.appendChild(todoDiv);

  // Clear input after click
  todoInput.value = "";
}

function deleteAndCheck(event) {
  const item = event.target;

  // delete todo
  if (item.classList[0] === "todo__trash-button") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });

    removeLocalTodos(todo);
  }

  // Checkmark todo
  if (item.classList[0] === "todo__complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Filter todos
function filterTodo(event) {
  const todos = todo.childNodes;

  todos.forEach((todoItem) => {
    switch (event.target.value) {
      case "all":
        todoItem.style.display = "flex";
        break;
      case "completed":
        if (todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todoItem.classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
    }
  });
}

function changeBackgroundColor() {
  body.style.backgroundColor = colorPicker.value;
  localStorage.setItem("color", JSON.stringify(colorPicker.value));
}

function saveLocalTodos(value) {
  let todoValues;

  // Check if value is already in local storage
  if (localStorage.getItem("todos") === null) {
    todoValues = [];
  } else {
    todoValues = JSON.parse(localStorage.getItem("todos"));
  }

  todoValues.push(value);
  localStorage.setItem("todos", JSON.stringify(todoValues));
}

function getFromLocalStorage() {
  // Get colorpicker background color from local storage
  let bgColor;
  bgColor = JSON.parse(localStorage.getItem("color"));
  body.style.backgroundColor = bgColor;

  // Set color to input #colorpicker
  colorPicker.value = bgColor;

  // Get todo-list items from local storage
  let todoValues;

  // Check if value is already in local storage
  if (localStorage.getItem("todos") === null) {
    todoValues = [];
  } else {
    todoValues = JSON.parse(localStorage.getItem("todos"));
  }

  todoValues.forEach(function (todoValues) {
    // create .todo__list div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__item");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoValues;
    newTodo.classList.add("todo__text");
    todoDiv.appendChild(newTodo);

    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("todo__complete-button");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("todo__trash-button");
    todoDiv.appendChild(trashButton);

    // Append to <ul class="todo"></ul>
    todo.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check if value is already in local storage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  console.log(todo);
}
