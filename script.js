// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li class="task ${task.completed ? 'completed' : ''}">
                <span>${task.name}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <button class="complete-btn" data-index="${index}">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                </div>
            </li>
        `;
        taskList.insertAdjacentHTML('beforeend', taskHTML);
    });
}

// Function to add task
function addTask(taskName) {
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification('Task added successfully!');
}

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification('Task deleted successfully!');
}

// Function to edit task
function editTask(index, newName) {
    tasks[index].name = newName;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification('Task updated successfully!');
}

// Function to complete task
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification('Task status updated!');
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event listeners
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        addTask(taskName);
        taskInput.value = '';
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        deleteTask(index);
    } else if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const taskName = prompt('Enter new task name:');
        if (taskName) {
            editTask(index, taskName);
        }
    } else if (e.target.classList.contains('complete-btn')) {
        const index = e.target.dataset.index;
        completeTask(index);
    }
});

// Initialize
renderTasks();
