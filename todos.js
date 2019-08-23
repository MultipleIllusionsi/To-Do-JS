let All_li = document.querySelectorAll(".todo-list__item");
let All_span = document.querySelectorAll("span");

const ul = document.querySelector("ul");
const input = document.querySelector("input");

// 1. input size validation
// 2. remove animation
// 3. separate list for completed tasks
// 4. opportunity to change text of the task
// 5. sync w/ localStorage

for (li of All_li) {
  li.addEventListener("click", function() {
    this.classList.toggle("completed");
  });
}

for (span of All_span) {
  span.addEventListener("click", function(e) {
    this.parentNode.remove();
    e.stopPropagation();
  });
}

input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    let todoText = this.value;
    this.value = "";
    ul.insertAdjacentHTML(
      "afterbegin",
      `<li class="todo-list__item">${todoText}<span><i class='fa fa-trash'></i></span></li>`
    );

    ul.firstChild.addEventListener("click", function() {
      this.classList.toggle("completed");
    });

    ul.firstChild.lastChild.addEventListener("click", function(e) {
      this.parentNode.remove();
      e.stopPropagation();
    });
  }
});

////////////////// way to remove elem w/ animation
// var elem = this.parentNode.style;
//     elem.opacity = 1;
//     (function fade() {
//       (elem.opacity -= 0.1) < 0
//         ? (elem.display = "none")
//         : setTimeout(fade, 40);
//     })();
