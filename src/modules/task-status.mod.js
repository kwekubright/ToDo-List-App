export class UpdateTaskStatus {
  // Updates the task status
  static updateTaskStatus = (index, checked, tasks) => {
    // Update the task status
    return tasks[index].checked = checked;
  }
}