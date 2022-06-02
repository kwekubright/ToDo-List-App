import { Tasks } from './task.mod.js';
import { Alert } from './alerts.mod.js';

export class TaskManipulation {
  // Adds a new task to the list
  static addTask = () => {
    const description = document.getElementById('new-task').value;
    if (description !== '') {
      const add = Tasks.push({
        index: Tasks.length,
        description: description,
        checked: false
      });
      // Save task to local storage
      this.saveTask();
      console.log(Tasks);

      if (add) {
        new Promise((resolve) => {
          resolve(Alert.showSuccess('Task added successfully'));
        });
        return true;
      }
    }
    else {
      new Promise((resolve) => {
        resolve(Alert.showError());
      });
      return false;
    }
  }

  // Removes the task from the list
  static removeTask = (e) => {
    // Get the index of the task to be removed
    const index = e.target.parentNode.parentNode.parentNode.getAttribute('data-taskindex');
    // Remove the task from the list
    const remove = Tasks.splice(index, 1);
    // We need to update the index of the remaining tasks
    Tasks.forEach((task, i) => {
      task.index = i;
    });
    // Save task to local storage
    this.saveTask();

    if (remove) {
      new Promise((resolve) => {
        resolve(Alert.showSuccess('Task removed successfully'));
      });

      return true;
    }
    else {
      new Promise((resolve) => {
        resolve(Alert.showError());
      });
      return false;
    }
  }

  // Updates the task in the list
  static updateTask = (e) => {
    // Get the index of the task to be updated
    const index = e.currentTarget.dataset.liid;
    // Get the new description of the task
    const description = e.target.value;
    if (description !== '') {
      // Update the task in the list
      const update = Tasks[index].description = description;
      // Save task to local storage
      this.saveTask();

      if (update) {
        new Promise((resolve) => {
          resolve(Alert.showSuccess('Task updated successfully'));
        });
        return true;
      }
      else {
        new Promise((resolve) => {
          resolve(Alert.showError());
        });
        return false;
      }
    }
    else {
      return false;
    }

  }

  // Save task to local storage
  static saveTask = () => {
    if (localStorage.setItem('tasks', JSON.stringify(Tasks))) {
      return true;
    }

    return false;
  }

}