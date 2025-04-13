let toDo = [{
  name: 'Make Tea',
  dueDate: '14-04-2025',
  time: '23 : 02'
}];

function renderTodoList() {
  let todoListHTML = '';
  let count = 0;
  for (let i = 0; i < toDo.length; i++) {
      const { name, dueDate, time } = toDo[i];
      const html = `<div class="animation">
          <div class="name-display">
          <input type="checkbox" class="check styled-checkbox" onclick="
            checking(${i});
          ">${i+1}. ${name}</div>
          <div class="date-display">${dueDate}</div>
          <div class="time-display">${time}</div>
          <button data-index="${i}" onclick="
              toDo.splice(${i}, 1);
              renderTodoList();
              saveToStorage();
          " class="delete-btn">Delete</button></div>
      `;
      todoListHTML += html;
      count++;
  }
  document.querySelector('.todo-display').innerHTML = todoListHTML;
  document.querySelector('.count').innerHTML = `${count} items total`;
}

const nameInput = document.querySelector('.js-name-input');
const dateInput = document.querySelector('.js-duedate-input');
const timeInput = document.querySelector('.js-time-input');
const addButton = document.querySelector('.add-btn');

function toggleAddButton() {
  if (nameInput.value && dateInput.value && timeInput.value) {
    addButton.disabled = false;
    addButton.style.opacity = '1';
  } else {
    addButton.disabled = true;
    addButton.style.opacity = '0.5';
  }
}


[nameInput, dateInput, timeInput].forEach(input => {
  input.addEventListener('input', toggleAddButton);
});


toggleAddButton();


function updateList(){
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;


  const duedateInputElement = document.querySelector('.js-duedate-input');
  const dueDate = duedateInputElement.value;

  const timeInputElement = document.querySelector('.js-time-input');
  const time = timeInputElement.value;


    
  toDo.push({
    name,
    dueDate,
    time
  });

  nameInputElement.value = '';
  duedateInputElement.value= '';
  timeInputElement.value = '';
  
  saveToStorage();
  renderTodoList();

   toggleAddButton();


}

function saveToStorage(){
  localStorage.setItem('toDo', JSON.stringify(toDo));
}

function checking(index){
  let item = document.querySelectorAll('.animation')[index];
 
  item.classList.add('fade-out');
    setTimeout( function(){
      toDo.splice(index, 1);
      saveToStorage();
      renderTodoList();

    }, 1000);
     
  
}

function deleteAll(){
  if(confirm('Are you sure you want to delete all todos?')){


    toDo.splice(0, toDo.length);
    saveToStorage();
    renderTodoList();
  }
}

// Load from localStorage when page loads
const storedTodos = JSON.parse(localStorage.getItem('toDo'));
if (storedTodos) {
  toDo = storedTodos;
}
renderTodoList();
