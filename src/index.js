import Sortable from 'sortablejs';
import { Tasks, render, renderWithEventListeners } from './modules/task.mod';
import { TaskManipulation } from './modules/task-manipulation.mod';
import { Alert } from './modules/alerts.mod';
import './style.css';

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

renderWithEventListeners(Tasks);

// Add task event listener
const newTask = document.getElementById('new-task');
newTask.addEventListener('keyup', (e) => {
  // If the key pressed is enter
  if (e.key === 'Enter') {
    const description = document.getElementById('new-task').value;
    // Let's add the task
    if (TaskManipulation.addTask(description, Tasks)) {
      // Save task to local storage
      TaskManipulation.saveTask();

      new Promise((resolve) => {
        resolve(Alert.showSuccess('Task added successfully'));
      });
      // Let's render the task list
      renderWithEventListeners(Tasks);
      // Let's clear the input field
      newTask.value = '';
    }
    else {
      new Promise((resolve) => {
        resolve(Alert.showError());
      });
    }
  }
});

// Add event listner for clear all text
const clearAll = document.getElementById('clear-all');
clearAll.addEventListener('click', () => {
  // Let's clear all tasks
  if (TaskManipulation.clearAllCompletedTask()) {
    // Let's render the task list
    render(Task);
  }
});

