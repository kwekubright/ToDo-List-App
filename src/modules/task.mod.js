import LocalStorage from "./local-storage.mod";
import { UpdateTaskStatus } from './task-status.mod';
import { TaskManipulation } from "./task-manipulation.mod";
import { Alert } from "./alerts.mod";

export let Tasks = LocalStorage.getItems();

export const loadTask = (tasks) => {
  let taskHTML = '';
  tasks.forEach((task) => {
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

export let render = (tasks) => {
  // Let's render the task list
  const render = document.getElementById('task-list').innerHTML = loadTask(tasks);
  return render || false;
}

export let renderWithEventListeners = (tasks) => {
  render(tasks);
  addEventListeners(tasks);
  TaskManipulation.saveTask(tasks);
}

export let addEventListeners = (tasks) => {

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
      // Get the index of the task to be removed
      const index = e.target.parentNode.parentNode.parentNode.getAttribute('data-taskindex');
      // Let's remove the task
      if (TaskManipulation.removeTask(index, Tasks)) {
        // Save task to local storage
        TaskManipulation.saveTask();

        new Promise((resolve) => {
          resolve(Alert.showSuccess('Task removed successfully'));
        });
        // Let's render the task list
        renderWithEventListeners(tasks);
      }
      else {
        new Promise((resolve) => {
          resolve(Alert.showError());
        });
      }
    });
  });

  // Edit task event listener
  const editItems = document.querySelectorAll('.editable-task');
  editItems.forEach((editItem) => {
    editItem.addEventListener('keyup', (e) => {
      // Get the index of the task to be updated
      const index = e.currentTarget.dataset.liid;
      // Get the new description of the task
      const description = e.target.value;
      if (e.key === 'Enter') {
        // Let's edit the task
        if (TaskManipulation.updateTask(index, description, Tasks)) {
          TaskManipulation.saveTask();
          
          new Promise((resolve) => {
            resolve(Alert.showSuccess('Task updated successfully'));
          });
          // Let's render the task list
          renderWithEventListeners(tasks);
        }
        else {
          new Promise((resolve) => {
            resolve(Alert.showError());
          });
        }
      }

    });
  });

  // Let's add ad event listener to the checkbox
  const checkboxItems = document.querySelectorAll('.checkbox');
  checkboxItems.forEach((checkboxItem) => {
    checkboxItem.addEventListener('change', (e) => {
      // Get the index of the task to be updated
      const index = e.target.parentNode.parentNode.parentNode.getAttribute("data-taskindex");
      // Is checkbox checked?
      const checked = e.currentTarget.checked;
      // Let's update the task
      if (UpdateTaskStatus.updateTaskStatus(index, checked, tasks)) {
        // Save task to local storage
        TaskManipulation.saveTask(tasks);

        new Promise((resolve) => {
          resolve(Alert.showSuccess("Task marked as completed"));
        });
        
        // Let's render the task list
        renderWithEventListeners(tasks);
      }
    });
  });

}