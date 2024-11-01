const allCheckboxes = document.querySelectorAll(".create_checkbox");
const itemsLeftText = document.getElementById("items-left");
const itemsCount = allCheckboxes.length;

document.getElementById("select-all").addEventListener("click", (e) => {
  e.preventDefault();
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
  updateItemsLeft();
});

document.getElementById("select-active").addEventListener("click", (e) => {
  e.preventDefault();
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateItemsLeft();
});
document.getElementById("clear-completed").addEventListener("click", (e) => {
  e.preventDefault();
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateItemsLeft();
});

document.getElementById("select-completed").addEventListener("click", (e) => {
  e.preventDefault();

  updateItemsLeft();
});

function updateItemsLeft() {
  const checkedCount = document.querySelectorAll(
    ".create_checkbox:checked"
  ).length;
  const leftCount = itemsCount - checkedCount;
  itemsLeftText.textContent = `${leftCount} items left`;
}

const closeButtons = document.querySelectorAll(".close-btn");
closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const checkbox = e.target.parentElement.querySelector(
      'input[type="checkbox"]'
    );
    if (checkbox) {
      checkbox.checked = false;
      updateItemsLeft();
    }
  });
});

const bgImg = document.querySelector("main");
const mode = document.querySelector(".mode");
const formBgs = document.querySelectorAll(
  ".create_bottom_form, .create_form, .checkbox_wrapper"
);

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
    form.classList.toggle("whitebg");
    form.classList.toggle("darkbg");
  });
});
