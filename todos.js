(function() {
  document.addEventListener("DOMContentLoaded", onPageLoaded);

  function onPageLoaded() {
    // constants
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");

    const ul = document.querySelector("ul");
    const input = document.querySelector("input");

    const modal = document.querySelector(".modal");
    const modalHideBtn = document.querySelector(".hideBtn");
    const modalSaveBtn = document.querySelector(".btn-save");
    const modalClearBtn = document.querySelector(".btn-clear");
    const modalHeading = document.querySelector(".modal-heading");

    const INITIAL_STATE = `<li class="todo-list__item">todo 1<span><i class="fa fa-trash"></i></span></li><li class="todo-list__item">todo 2<span><i class="fa fa-trash"></i></span></li>`;

    loadTodos();
    AddingEventListenerToInterface();

    // functions
    function loadTodos() {
      const data = localStorage.getItem("todos");
      if (data) {
        ul.innerHTML = data;
        console.log("data", data);
      } else {
        ul.innerHTML = INITIAL_STATE;
      }

      const deleteButtons = document.querySelectorAll("span");
      for (const button of deleteButtons) {
        DeleteTodoClick(button);
      }
    }

    function createTodo() {
      const li = document.createElement("li");
      const spanElement = document.createElement("span");
      const icon = document.createElement("i");

      li.classList.add("todo-list__item");
      icon.classList.add("fa", "fa-trash");

      if (
        input.value.trim().length < 35 &&
        input.value.trim().length > 0
      ) {
        const todoText = input.value.trim();
        input.value = "";
        spanElement.append(icon);
        ul.appendChild(li).append(todoText, spanElement);
        DeleteTodoClick(spanElement);
      } else {
        alert(
          "The task must not be empty and contain no more than 35 characters!"
        );
        input.value = "";
      }
    }

    function DeleteTodoClick(element) {
      element.addEventListener("click", event => {
        element.parentElement.remove();
        event.stopPropagation();
      });
    }

    function toggleTodo(event) {
      if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
      }
    }

    function modalList(action) {
      switch (action) {
        case "Save":
          modalClearBtn.style.display = "none";
          modalSaveBtn.style.display = "inline-block";
          break;
        case "Delete":
          modalSaveBtn.style.display = "none";
          modalClearBtn.style.display = "inline-block";
          break;
        default:
          alert(`Something went wrong in the modal window :(`);
          return;
      }

      modal.classList.add("modal-active");
      modalHeading.textContent = `${action} this list?`;
    }

    function hidePopUp() {
      modal.classList.remove("modal-active");
    }

    function AddingEventListenerToInterface() {
      ul.addEventListener("click", toggleTodo);

      modalHideBtn.addEventListener("click", function() {
        hidePopUp();
      });

      saveButton.addEventListener("click", function() {
        modalList("Save");
      });

      clearButton.addEventListener("click", function() {
        modalList("Delete");
      });

      modalClearBtn.addEventListener("click", function() {
        ul.innerHTML = "";
        localStorage.removeItem("todos", ul.innerHTML);
        hidePopUp();
      });

      modalSaveBtn.addEventListener("click", function() {
        localStorage.setItem("todos", ul.innerHTML);
        hidePopUp();
      });

      input.addEventListener("keypress", function(event) {
        if (event.keyCode === 13) {
          createTodo();
        }
      });
    }
  }
})();
