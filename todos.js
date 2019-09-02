(function() {
  function onPageLoaded() {
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const ul = document.querySelector("ul");
    const input = document.querySelector("input");
    const modal = document.querySelector(".modal");
    const modalHideBtn = document.querySelector(".hideBtn");
    const modalSaveBtn = document.querySelector(".btn-save");
    const modalClearBtn = document.querySelector(".btn-clear");
    const modalHeading = document.querySelector(".modal-heading");
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

      if (input.value.length < 35 && input.value.length > 0) {
        var todoText = input.value;
        input.value = "";
        spanElement.append(icon);
        ul.appendChild(li).append(todoText, spanElement);
        DeleteTodo(spanElement);
      } else {
        alert(
          "The task must not be empty and contain no more than 35 characters!"
        );
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
    //////////////////////////////////
    function saveList() {
      modal.classList.add("modal-active");

      modalClearBtn.style.display = "none";
      modalSaveBtn.style.display = "inline-block";

      modalHeading.textContent = "Save this list?";
    }

    function clearList() {
      modal.classList.add("modal-active");

      modalSaveBtn.style.display = "none";
      modalClearBtn.style.display = "inline-block";

      modalHeading.textContent = "Delete this list?";
    }
    //////////////////////////////////
    function hidePopUp() {
      modal.classList.remove("modal-active");
    }

    ///////////////////////////////////
    function InterfaceEvtListener() {
      ul.addEventListener("click", onClickTodo);

      modalHideBtn.addEventListener("click", () => {
        hidePopUp();
      });

      saveButton.addEventListener("click", function() {
        saveList();
      });

      clearButton.addEventListener("click", function() {
        clearList();
      });

      modalClearBtn.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem("todos", ul.innerHTML);
        hidePopUp();
      });

      modalSaveBtn.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
        hidePopUp();
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
