import Sortable from 'sortablejs';
import { Tasks } from './modules/task.mod';
import { TaskManipulation } from './modules/task-manipulation.mod';
import { UpdateTaskStatus } from './modules/task-status.mod';
import './style.css';

const loadTask = () => {
  let taskHTML = '';
  Tasks.forEach((task) => {
    taskHTML
      += `<li id="liid-${task.index}" class="flex w-100 border-bottom single-task" data-taskindex="${task.index}">
    <div class="task flex flex-justify-space-between flex-align-center card w-100">
    <span class="task-name flex flex-justify-start flex-align-center">
    <input type="checkbox" id="" name="checkbox[]" ${(task.checked) ? "checked" : ""} class="checkbox">
    <input class="editable-task ${(task.checked) ? "completed" : ""}" data-liid="${task.index}" value="${task.description}">
    </span>
    <span class="task-delete">
    <i class="fa fa-ellipsis-v fa-lg show" aria-hidden="true"></i>
    <i class="fa fa-trash-o fa-lg hide" aria-hidden="true"></i>
    </span>
    </div>
    </li>`;
  });

  return taskHTML;
}

let render = () => {
  // Let's render the task list
  document.getElementById('task-list').innerHTML = loadTask();

  // Let's add mouseover event to the task list
  let taskItems = document.querySelectorAll('.single-task');
  taskItems.forEach((taskItem) => {
    taskItem.addEventListener('mouseover', (e) => {
      const dataIndex = e.currentTarget.dataset.taskindex;
      // Let's highlight the current task
      document.querySelector('#liid-' + dataIndex + ' > .task').classList.add('edit-mode');
      // Lets hide the drag icon
      const dragEl = document.querySelector('#liid-' + dataIndex + ' .fa-ellipsis-v');
      dragEl.classList.remove('show');
      dragEl.classList.add('hide');
      // Let's show the delete icon
      const deleteEl = document.querySelector('#liid-' + dataIndex + ' .fa-trash-o');
      deleteEl.classList.add('show');
      deleteEl.classList.remove('hide');
    });

    // Let's add mouseout event to the task list
    taskItem.addEventListener('mouseout', (e) => {
      let currActive = document.getElementsByClassName('edit-mode')[0];
      if (currActive) {
        currActive.classList.remove('edit-mode');
      }
      const dataIndex = e.currentTarget.dataset.taskindex;
      // Lets hide the drag icon
      const dragEl = document.querySelector('#liid-' + dataIndex + ' .fa-ellipsis-v');
      dragEl.classList.remove('hide');
      dragEl.classList.add('show');
      // Let's show the delete icon
      const deleteEl = document.querySelector('#liid-' + dataIndex + ' .fa-trash-o');
      deleteEl.classList.add('hide');
      deleteEl.classList.remove('show');
    });
  });

  // Delete task event listener
  const delItems = document.querySelectorAll('.fa-trash-o');
  delItems.forEach((delItem) => {
    delItem.addEventListener('click', (e) => {
      // Let's remove the task
      if (TaskManipulation.removeTask(e)) {
        // Let's render the task list
        render();
      }
    });
  });

  // Edit task event listener
  const editItems = document.querySelectorAll('.editable-task');
  editItems.forEach((editItem) => {
    editItem.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        // Let's edit the task
        if (TaskManipulation.updateTask(e)) {
          // Let's render the task list
          render();
        }
      }

    });
  });

  // Let's add ad event listener to the checkbox
  const checkboxItems = document.querySelectorAll('.checkbox');
  checkboxItems.forEach((checkboxItem) => {
    checkboxItem.addEventListener('change', (e) => {
      // Let's update the task
      if (UpdateTaskStatus.updateTaskStatus(e)) {
        // Let's render the task list
        render();
      }
    });
  });
}

const el = document.getElementById('task-list');
Sortable.create(el, {
  // Drag end event
  onEnd: (e) => {
    // Let's update the task
    if (TaskManipulation.changeIndex(e.oldIndex, e.newIndex)) {
      // Let's render the task list
      //render();
    }
  }
});

render();

// Add task event listener
const newTask = document.getElementById('new-task');
newTask.addEventListener('keyup', (e) => {
  // If the key pressed is enter
  if (e.key === 'Enter') {
    // Let's add the task
    if (TaskManipulation.addTask()) {
      // Let's render the task list
      render();
      // Let's clear the input field
      newTask.value = '';
    }
  }
});

// Add event listner for clear all text
const clearAll = document.getElementById('clear-all');
clearAll.addEventListener('click', (e) => {
  // Let's clear all tasks
  if (TaskManipulation.clearAllCompletedTask()) {
    // Let's render the task list
    render();
  }
});

