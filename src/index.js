import Sortable from 'sortablejs';
import { Tasks } from './modules/task.mod';
import './style.css';

const loadTask = () => {
  let taskHTML = '';
  Tasks.forEach((task) => {
    taskHTML
      += `<li id="liid-${task.index}" class="flex w-100 border-bottom single-task" data-taskindex="${task.index}">
    <div class="task flex flex-justify-space-between flex-align-center card w-100">
    <span class="task-name flex flex-justify-start flex-align-center">
    <input type="checkbox" id="" name="checkbox[]" ${(task.checked) ? "checked" : ""} class="checkbox">
    <textarea class="" data-liid="${task.index}" name="vehicle1" rows="1">${task.description}</textarea>
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

const el = document.getElementById('task-list');
Sortable.create(el, {
  // Element dragging ended event callback
  onEnd: (evt) => {}
});

// Let's render the task list
document.getElementById('task-list').innerHTML = loadTask();

let taskItems = document.querySelectorAll('.single-task');
taskItems.forEach((taskItem) => {
  taskItem.addEventListener('mouseover', (e) => {
    const dataIndex = e.currentTarget.dataset.taskindex;
    // Let's highlight the current task
    document.querySelector('#liid-' + dataIndex+ ' > .task').classList.add('edit-mode');
    // Lets hide the drag icon
    const dragEl = document.querySelector('#liid-' + dataIndex  + ' .fa-ellipsis-v');
    dragEl.classList.remove('show');
    dragEl.classList.add('hide');
    // Let's show the delete icon
    const deleteEl = document.querySelector('#liid-' + dataIndex  + ' .fa-trash-o');
    deleteEl.classList.add('show');
    deleteEl.classList.remove('hide');
  });

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