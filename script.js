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
  textError.textContent = "";
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
  e.target.previousElementSibling.previousElementSibling.classList.remove("wrongInput");
  e.target.previousElementSibling.classList.remove("wrongInput");
  if (!e.target.previousElementSibling.previousElementSibling.value &&
    (new Date(e.target.previousElementSibling.value) < new Date() ||
      !e.target.previousElementSibling.value)
    ) {
        e.target.previousElementSibling.previousElementSibling.classList.add("wrongInput");
        e.target.previousElementSibling.classList.add("wrongInput");
      }
  if (!e.target.previousElementSibling.previousElementSibling.value) {
    e.target.previousElementSibling.previousElementSibling.classList.add("wrongInput");
    return;
  }
  if (
    new Date(e.target.previousElementSibling.value) < new Date() ||
    !e.target.previousElementSibling.value) {
    e.target.previousElementSibling.classList.add("wrongInput");
  }

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

const searchInputEl = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortSelectEl = document.getElementById("sortSelect");
let currentFilterState = "all";

if (searchInputEl) searchInputEl.addEventListener("input", updateTasksView);
if (sortSelectEl) sortSelectEl.addEventListener("change", updateTasksView);

filterButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilterState = btn.getAttribute("data-filter");
    updateTasksView();
  });
});

list.addEventListener("change", updateTasksView);
const observer = new MutationObserver(updateTasksView);
observer.observe(list, { childList: true });

function updateTasksView() {
  const lis = Array.from(list.children);
  if (lis.length === 0) return;

  const searchValue = searchInputEl ? searchInputEl.value.toLowerCase() : "";

  lis.forEach(li => {
    const inputs = li.querySelectorAll("input");
    if (inputs.length < 3) return; 

    const isChecked = inputs[0].checked;
    const text = inputs[1].value.toLowerCase();
    const dateStr = inputs[2].value;

    const deadline = new Date(dateStr);
    const now = new Date();
    const diffHours = (deadline - now) / (1000 * 60 * 60);

    let isOverdue = false;
    let isDueSoon = false;

    if (!isChecked && diffHours < 0) isOverdue = true;
    else if (!isChecked && diffHours >= 0 && diffHours <= 24) isDueSoon = true;

    let badge = li.querySelector(".status-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "status-badge";
      li.insertBefore(badge, li.querySelector(".fa-trash"));
    }

    if (isChecked) {
      li.style.backgroundColor = "#f4f1ea";
      li.style.border = "none";
      badge.innerHTML = "Tamamlanıb";
      badge.className = "status-badge badge-completed";
    } else if (isOverdue) {
      li.style.backgroundColor = "#ffe6e6";
      li.style.border = "2px solid #ff4d4d";
      badge.innerHTML = "🔴 Gecikir!";
      badge.className = "status-badge badge-overdue";
    } else if (isDueSoon) {
      li.style.backgroundColor = "#fff9e6";
      li.style.border = "2px solid #ffcc00";
      badge.innerHTML = "🟡 Yaxınlaşır";
      badge.className = "status-badge badge-due-soon";
    } else {
      li.style.backgroundColor = "#f4f1ea";
      li.style.border = "none";
      badge.innerHTML = "🟢 Normal";
      badge.className = "status-badge badge-normal";
    }

    let matchesSearch = text.includes(searchValue);
    let matchesFilter = true;

    if (currentFilterState === "active") matchesFilter = !isChecked;
    if (currentFilterState === "completed") matchesFilter = isChecked;
    if (currentFilterState === "overdue") matchesFilter = isOverdue;

    if (matchesSearch && matchesFilter) {
      li.style.display = "grid";
    } else {
      li.style.display = "none"; 
    }
  });

  lis.sort((a, b) => {
    const dateInputA = a.querySelectorAll("input")[2];
    const dateInputB = b.querySelectorAll("input")[2];
    if (!dateInputA || !dateInputB) return 0;

    const dateA = new Date(dateInputA.value);
    const dateB = new Date(dateInputB.value);

    const sortVal = sortSelectEl ? sortSelectEl.value : "deadline-asc";

    if (sortVal === "deadline-asc") return dateA - dateB;
    if (sortVal === "deadline-desc") return dateB - dateA;
    if (sortVal === "created-desc") return parseInt(b.id) - parseInt(a.id);
    return 0;
  });

  observer.disconnect(); 
  lis.forEach(li => list.appendChild(li));
  observer.observe(list, { childList: true });
}

setTimeout(updateTasksView, 200);
setInterval(updateTasksView, 60000);