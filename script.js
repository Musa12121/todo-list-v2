let input = document.getElementById("text");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let dateInput = document.getElementById("dateInput");
let form = document.querySelector("form");
let data = [];

function main() {
  makingTask(input.value, dateInput.value);

  input.value = "";
}

function makingTask(text, date) {
  if (!text || !date) {
    setError(text, date);
    return;
  }
  let listElement = document.createElement("li");
  let newDate = new Date();
  let id = Date.now().toString();
  listElement.setAttribute('id',id)

  listElement.innerHTML = `
  <label>
  <input type='checkbox' onchange='toggle(event,${id})'>
  <input type='text' value='${text}' class='editInput'> 
  <input type='datetime-local' value='${date}' class='editInput'>
  </label>
  <button id='editButton' onclick='edit(text,date)'>Edit</button>
  <i class="fa-solid fa-trash" style='font-size:20px;color: rgb(255, 255, 255);background-color:red;padding:10px 28px 10px 10px;border-radius:5px'></i>`;
  data.push({
    id: id,
    title: text,
    isCompleted: false,
    createdAt: `${newDate.toLocaleDateString().split("/").reverse().join("-")}T${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
    deadline: `${date}`,
  });
  addLocalStorage();
  list.appendChild(listElement);

  setTimeout(() => {
    listElement.classList.add("showListElement");
  }, 100);
}

function edit(text, date) {}

function toggle(e, id) {
  if (e.target.checked) {
    data.find(el=>el['id']==id).isCompleted=true
    e.target.parentElement.classList.add("checkedLi");
  } else {
    data.find(el=>el['id']==id).isCompleted=false
    e.target.parentElement.classList.remove("checkedLi");
  }
}

function setError(text, date) {
  if (!text && !date) {
    throw new Error("Neither Name nor Deadline is entered");
  }
  if (!text) {
    throw new Error("Name is not entered");
  }
  if (!date) {
    throw new Error("Deadline is not entered");
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    main();
  }
});

addBtn.addEventListener("click", main);

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.classList.remove("showListElement");
    let timeout = setTimeout(() => {
      data=data.filter(el=>el.id!=e.target.parentElement.getAttribute('id'))
      addLocalStorage()
      e.target.parentElement.remove();
    }, 400);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

window.addEventListener("load", () => {
  if (JSON.parse(localStorage.getItem("data"))) {
      JSON.parse(localStorage.getItem("data")).forEach((element) => {
        makingTask(element.title,element.deadline);
      })
  } else {
    list.textContent = "example text";
  }
});

function addLocalStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}
