let input = document.getElementById("text");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let dateInput = document.getElementById("dateInput");
let form = document.querySelector("form");
let textError = document.querySelector(".textError");
let data = [];

function main() {
  makingTask(input.value, dateInput.value);
}

function makingTask(text, date, checked = false) {
  textError.textContent='';
  input.classList.remove("wrongInput");
  dateInput.classList.remove("wrongInput");
  if (!text && !date) {
    input.classList.add("wrongInput");
    dateInput.classList.add("wrongInput");
    textError.textContent = "Neither Task nor Deadline is entered";
    return;
  }
  if (!text) {
    input.classList.add("wrongInput");
    textError.textContent = "Task is not entered";
    return;
  }
  if (!date) {
    dateInput.classList.add("wrongInput");
    textError.textContent = "Deadline is not entered";
    return;
  }
  if (new Date() > new Date(date)) {
    dateInput.classList.add("wrongInput");
    textError.textContent = "Deadline has to be the future time";
    return;
  }

  let listElement = document.createElement("li");
  let newDate = new Date();
  let id = Date.now().toString();
  listElement.setAttribute("id", id);
  data.push({
    id: id,
    title: text,
    isCompleted: checked,
    createdAt: `${newDate.toLocaleDateString().split("/").reverse().join("-")}T${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
    deadline: `${date}`,
  });
  addLocalStorage();
  if (checked) {
    listElement.innerHTML = ` 
  <input type='checkbox' onchange='toggle(event,"${id}")' checked>
  <input type='text' value="${text}" class='checkedLi'> 
  <input type='datetime-local' value="${date}">
  <button id='editButton' onclick='edit(event,"${id}")'>Edit</button>
  <i class="fa-solid fa-trash" style='font-size:20px;color: rgb(255, 255, 255);background-color:red;padding:10px 28px 10px 10px;border-radius:5px'></i>`;
  } else {
    listElement.innerHTML = ` 
  <input type='checkbox' onchange='toggle(event,"${id}")'>
  <input type='text' value="${text}"> 
  <input type='datetime-local' value="${date}">
  <button id='editButton' onclick='edit(event,"${id}")'>Edit</button>
  <i class="fa-solid fa-trash" style='font-size:20px;color: rgb(255, 255, 255);background-color:red;padding:10px 28px 10px 10px;border-radius:5px'></i>`;
  }
  list.appendChild(listElement);

  setTimeout(() => {
    listElement.classList.add("showListElement");
  }, 100);
  input.value = null;
  dateInput.value = null;
}

function edit(e, id) {
  if (!e.target.previousElementSibling.previousElementSibling.value) {
    e.target.previousElementSibling.previousElementSibling.classList.add(
      "wrongInput",
    );
    return;
  }
  e.target.previousElementSibling.previousElementSibling.classList.remove(
    "wrongInput",
  );

  data.find((el) => el["id"] == id).title =
    e.target.previousElementSibling.previousElementSibling.value;
  data.find((el) => el["id"] == id).deadline =
    e.target.previousElementSibling.value;
  addLocalStorage();
}

function toggle(e, id) {
  if (e.target.checked) {
    data.find((el) => el["id"] == id).isCompleted = true;
    e.target.nextElementSibling.classList.add("checkedLi");
  } else {
    data.find((el) => el["id"] == id).isCompleted = false;
    e.target.nextElementSibling.classList.remove("checkedLi");
  }
  addLocalStorage();
}

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    main();
  }
});

function completeCounter() {
  let completed = 0;
  let notCompleted = 0;
  let late = 0;
  data.forEach((item) => {
    if (item.isCompleted) {
      completed += 1;
    } else {
      notCompleted += 1;
    }
    if (new Date() > new Date(item.deadline)) {
      late += 1;
    }
  });
  list.innerHTML = `<p>Tamamlanmış:${completed}</p><p>Tamamlanmamış:${notCompleted}</p> <p>Gecikmiş:${late}</p>`;
}

addBtn.addEventListener("click", main);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.classList.remove("showListElement");
    let timeout = setTimeout(() => {
      data = data.filter(
        (el) => el.id != e.target.parentElement.getAttribute("id"),
      );
      addLocalStorage();
      e.target.parentElement.remove();
      if (
        localStorage.getItem("data") == null ||
        JSON.parse(localStorage.getItem("data")).length == 0
      ) {
        completeCounter();
      }
    }, 400);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {
  if (
    localStorage.getItem("data") == null ||
    JSON.parse(localStorage.getItem("data")).length == 0
  ) {
    completeCounter();
  } else if (JSON.parse(localStorage.getItem("data")).length > 0) {
    JSON.parse(localStorage.getItem("data")).forEach((element) => {
      makingTask(element.title, element.deadline, element.isCompleted);
    });
  }
});

function addLocalStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}
