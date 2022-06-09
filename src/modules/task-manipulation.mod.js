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
  static updateTask = (index, desc, tasks) => {
    if (desc !== '') {
      // Update the task in the list
      const update = tasks[index].description = desc;

      return update || false;
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
  static clearAllCompletedTask = (tasks) => {
    const clear = tasks.filter((task) => {
      return task.checked === true;
    });

    clear.forEach((clear) => {
      tasks.splice(clear.index, 1);
      // We need to update the index of the remaining tasks
      tasks.forEach((task, i) => {
        task.index = i;
      });
    });
    
    return clear || false;
  }

  // Save task to local storage
  static saveTask = (tasks = []) => {
    if (tasks.length === 0  ) {
      return localStorage.setItem('tasks', JSON.stringify(Tasks)) || false;
    }
    else {
      return localStorage.setItem('tasks', JSON.stringify(tasks)) || false;
    }
  }

}