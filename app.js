// app.js

const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = ''; // Erst alles löschen

  tasks.forEach((task, index) => {
    if (
      currentFilter === 'done' && !task.done ||
      currentFilter === 'open' && task.done
    ) {
      return; // Überspringe diese Aufgabe
    }
  
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);
    if (task.done) {
        li.classList.add('completed');
      }
    

  if (task.date) {
    const dateSpan = document.createElement('small');
    dateSpan.textContent = `📅 ${task.date}`;
    dateSpan.style.marginLeft = '10px';
    li.appendChild(dateSpan);
   }

  
    li.addEventListener('click', () => {
      tasks[index].done = !task.done;
      saveTasks();
      renderTasks();
    });
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
  
}
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;

    // Aktive Klasse setzen
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderTasks();
  });
});


// ➕ Neue Aufgabe hinzufügen
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById('task-date').value;
  
    if (taskText !== '') {
      tasks.push({ text: taskText, done: false, date: taskDate });
      saveTasks();
      renderTasks();
      taskInput.value = '';
      document.getElementById('task-date').value = ''; // optional: Datum auch leeren
    }
  });
  

// 📥 Beim Start laden
renderTasks();

const toggleBtn = document.getElementById('toggle-darkmode');

// Dark Mode speichern & anwenden
if (localStorage.getItem('darkmode') === 'enabled') {
  document.body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkmode', isDark ? 'enabled' : 'disabled');
});



