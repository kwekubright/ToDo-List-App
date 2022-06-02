import { Tasks } from "./task.mod";
import { TaskManipulation } from "./task-manipulation.mod";
import { Alert } from "./alerts.mod";

export class UpdateTaskStatus {
  // Updates the task status
  static updateTaskStatus = (e) => {
    // Get the index of the task to be updated
    const index = e.target.parentNode.parentNode.parentNode.getAttribute("data-taskindex");
    // Is checkbox checked?
    const checked = e.currentTarget.checked;
    // Update the task status
    const update = Tasks[index].checked = checked;
    // Save task to local storage
    TaskManipulation.saveTask();

    new Promise((resolve) => {
      resolve(Alert.showSuccess((update) ? "Task marked as completed" : "Task marked as incomplete"));
    });

    return true;
  };
}
