// Selectors
const todoInput = document.querySelector(".todo-form__input");
const todoButton = document.querySelector(".todo-form__button");
const todo = document.querySelector(".todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);

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
