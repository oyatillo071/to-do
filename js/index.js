const creator = document.querySelector("#create_checkbox");

function updateCheckboxes() {
  return document.querySelectorAll(".create_checkbox");
}

function filterTodos(filter) {
  const allCheckboxes = updateCheckboxes();

  allCheckboxes.forEach((checkbox) => {
    const todoItem = checkbox.parentElement;
    if (filter === "all") {
      todoItem.style.display = "flex";
    } else if (filter === "active" && !checkbox.checked) {
      todoItem.style.display = "flex";
    } else if (filter === "completed" && checkbox.checked) {
      todoItem.style.display = "flex";
    } else {
      todoItem.style.display = "none";
    }
  });
}

// 'All' filter
document.getElementById("select-all").addEventListener("click", (e) => {
  e.preventDefault();
  filterTodos("all");
});

// 'Active' filter
document.getElementById("select-active").addEventListener("click", (e) => {
  e.preventDefault();
  filterTodos("active");
});

// 'Completed' filter
document.getElementById("select-completed").addEventListener("click", (e) => {
  e.preventDefault();
  filterTodos("completed");
});

// 'Clear Completed' button removes completed items
document.getElementById("clear-completed").addEventListener("click", (e) => {
  e.preventDefault();
  const allCheckboxes = updateCheckboxes();

  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked && checkbox !== creator) {
      checkbox.parentElement.remove();
      count--;
    }
  });
  innerCount(count);
});

function addCloseButtonListeners() {
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      button.parentElement.parentElement.remove();
      innerCount(count);
    });
  });
}

const bgImg = document.querySelector("main");
const mode = document.querySelector(".mode");
const formBgs = document.querySelectorAll(
  " .create_bottom_form, .create_form, .create_checkbox, .form_info,.create_bottom_form,.to-do_block"
);
const checkboxWr = document.querySelectorAll(".to-do_block,.create_checkbox");

// function checkboxChange() {
//   if (document.body.classList.contains("dark-mode")) {
//     const checkboxWrap = document.querySelectorAll(
//       ".checkbox_wrapper,.create_bottom_form"
//     );

//     checkboxWrap.forEach((form) => {
//       form.classList.toggle("whitebg");
//       form.classList.toggle("darkbg");
//     });
//   }
// }

mode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const currentSrc = mode.getAttribute("src");
  const currentBgc = bgImg.getAttribute("class");

  mode.setAttribute(
    "src",
    currentSrc === "./images/moon.svg"
      ? "./images/shine.svg"
      : "./images/moon.svg"
  );

  bgImg.setAttribute(
    "class",
    currentBgc === "main_light" ? "main_dark" : "main_light"
  );

  formBgs.forEach((form) => {
    document.body.classList.contains("dark-mode")
      ? form.classList.replace("whitebg", "darkbg")
      : form.classList.replace("darkbg", "whitebg");
  });

  checkboxWr.forEach((form) => {
    document.body.classList.contains("dark-mode")
      ? form.classList.replaceAll("whitebg", "darkbg")
      : form.classList.replaceAll("darkbg", "whitebg");
  });

  // checkboxChange();
});

const createCheckboxInput = document.getElementById("create_checkbox");
const todoBlock = document.querySelector(".to-do_block");

let count = 0;
function innerCount(counter) {
  document.querySelector("#items-left").innerHTML = counter + " items left";
}

innerCount(count);

createCheckboxInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();

    const todoText = createCheckboxInput.value.trim();
    if (todoText !== "") {
      count++;
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("checkbox_wrapper");

      const checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.classList.add("create_checkbox");
      checkboxInput.id = `todo-${todoBlock.children.length + 1}`;

      checkboxInput.addEventListener("change", () => {
        checkboxInput.checked
          ? (label.style.textDecoration = " line-through")
          : (label.style.textDecoration = "none");
      });

      const label = document.createElement("label");
      label.setAttribute("for", checkboxInput.id);
      label.textContent = todoText;

      const closeButton = document.createElement("span");
      closeButton.classList.add("close-btn");
      closeButton.textContent = "X";
      closeButton.addEventListener("click", () => {
        todoBlock.removeChild(todoDiv);
        count--;
        innerCount(count);
      });

      label.appendChild(closeButton);
      todoDiv.appendChild(checkboxInput);
      todoDiv.appendChild(label);
      todoBlock.appendChild(todoDiv);

      createCheckboxInput.value = "";

      innerCount(count);

      // document.body.classList.contains("dark-mode")
      //   ? todoDiv.classList.add("darkbg")
      //   : todoDiv.classList.add("whitebg");
    }
  }
});
