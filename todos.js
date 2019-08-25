(function() {
  function onPageLoaded() {
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const ul = document.querySelector("ul");
    const input = document.querySelector("input");

    ////////////////////////////////
    function loadTodos() {
      const data = localStorage.getItem("todos");
      if (data) {
        ul.innerHTML = data;
      }
      const deleteButtons = document.querySelectorAll("span");
      for (const button of deleteButtons) {
        DeleteTodo(button);
      }
    }

    //////////////////////////////
    function createToDo() {
      const li = document.createElement("li");
      const spanElement = document.createElement("span");
      const icon = document.createElement("i");

      li.classList.add("todo-list__item");
      icon.classList.add("fa", "fa-trash");

      if (input.value.length < 35) {
        var todoText = input.value;
        input.value = "";
        spanElement.append(icon);
        ul.appendChild(li).append(todoText, spanElement);
        DeleteTodo(spanElement);
      } else {
        alert("Задание должно содержать меньше 35 символов!");
        input.value = "";
      }
    }

    /////////////////////////////////
    function DeleteTodo(element) {
      element.addEventListener("click", event => {
        element.parentElement.remove();
        event.stopPropagation();
      });
    }

    //////////////////////////////////
    function onClickTodo(evt) {
      if (evt.target.tagName === "LI") {
        evt.target.classList.toggle("completed");
      }
    }

    ///////////////////////////////////
    function InterfaceEvtListener() {
      ul.addEventListener("click", onClickTodo);

      saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
      });

      clearButton.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem("todos", ul.innerHTML);
      });

      input.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
          createToDo();
        }
      });
    }

    loadTodos();
    InterfaceEvtListener();
  }
  document.addEventListener("DOMContentLoaded", onPageLoaded);
})();

//////////////////////////////// features
// 1. opportunity to change text of the task
