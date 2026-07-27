let input = document.getElementById("text");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let dateInput=document.getElementById("dateInput");
let form=document.querySelector('form')

function main() {

  makingTask(input.value,dateInput.value);

  input.value = "";

  // saveLocalStorage();
}

// window.addEventListener("load", () => {
//   JSON.parse(localStorage.getItem("items")).forEach((item) => makingTask(item));
// });

function makingTask(text,date) {
  if(!text || !date){setError(text,date);return;}
  let listElement = document.createElement("li");

  listElement.innerHTML = `<label><input type='checkbox' onchange='toggle(event)'><h2>${text}</h2> <span>Deadline:${date}</span></label><i class="fa-solid fa-trash" style='font-size:20px;color: rgb(255, 255, 255);background-color:red;padding:10px 28px 10px 10px;border-radius:5px'></i>`;

  list.appendChild(listElement);

  let timeout = setTimeout(() => {
    listElement.classList.add("showListElement");
  }, 100);
}

function toggle(e){
  if(e.target.checked){e.target.nextElementSibling.classList.add('checkedLi');e.target.nextElementSibling.nextElementSibling.classList.add('checkedLi')}
  else{e.target.nextElementSibling.classList.remove('checkedLi');e.target.nextElementSibling.nextElementSibling.classList.remove('checkedLi')}
}

function setError(text,date){
  if(!text && !date){throw new Error('Neither Name nor Deadline is entered')}
  if(!text){throw new Error('Name is not entered')}
  if(!date){throw new Error('Deadline is not entered')}
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
      e.target.parentElement.parentElement.remove();
      // saveLocalStorage();
    }, 400);
  }
});

form.addEventListener('submit',e=>{
  e.preventDefault()
})

// function saveLocalStorage() {
//   let data = [];
//   list.querySelectorAll("li").forEach((item) => {
//     data.push(item.textContent);
//   });

//   localStorage.setItem("items", JSON.stringify(data));
// }
