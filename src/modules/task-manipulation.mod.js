import { Tasks } from './task.mod.js';
import { Alert } from './alerts.mod.js';

export class TaskManipulation {
  // Adds a new task to the list
  static addTask = (desc, tasks) => {
    if (desc !== '') {
      const add = tasks.push({
        index: tasks.length,
        description: desc,
        checked: false
      });

      this.saveTask();

      return add || false;
    }
    return false;
  }
  // Removes the task from the list
  static removeTask = (index, tasks) => {
    // Remove the task from the list
    const remove = tasks.splice(index, 1);
    // We need to update the index of the remaining tasks
    tasks.forEach((task, i) => {
      task.index = i;
    });

    return remove || false;
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

  // Change the index of the task object in the task array
  static changeIndex = (oldIndex, newIndex) => {
    const change = Tasks.splice(oldIndex, 1);
    Tasks.splice(newIndex, 0, change[0]);
    // We need to update the index of the remaining tasks
    Tasks.forEach((task, i) => {
      task.index = i;
    });

    // Alert the user
    new Promise((resolve) => {
      resolve(Alert.showSuccess('Task moved successfully'));
    });

    // Save task to local storage
    this.saveTask();
  }

  // Clear all completed tasks
  static clearAllCompletedTask = () => {
    const clear = Tasks.filter((task) => {
      return task.checked === true;
    });

    clear.forEach((clear) => {
      Tasks.splice(clear.index, 1);
      // We need to update the index of the remaining tasks
      Tasks.forEach((task, i) => {
        task.index = i;
      });
    });
    
    // Save task to local storage
    this.saveTask();

    if (clear) {
      new Promise((resolve) => {
        resolve(Alert.showSuccess('Completed tasks cleared successfully'));
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

  // Save task to local storage
  static saveTask = () => {
    if (localStorage.setItem('tasks', JSON.stringify(Tasks))) {
      return true;
    }

    return false;
  }

}