/* eslint-disable no-undef */
import { TaskManipulation } from "../src/modules/task-manipulation.mod";
import LocalStorage from "../__mocks__/localstorage.js";
import { renderWithEventListeners } from "../src/modules/task.mod";
import { UpdateTaskStatus } from "../src/modules/task-status.mod";

// Mock local storage
let testTasks = new LocalStorage();
let index = 0;
let task = class {
  constructor(desc) {
    this.index = index++;
    this.description = desc;
    this.checked = false;
  }
};

for (let i = 0; i < 3; i++) {
  testTasks.setItems(new task("Task " + i));
}


beforeAll(() => {
  document.body.innerHTML = `<ul id="task-list" class="flex flex-column w-100"></ul>`;
  renderWithEventListeners(testTasks.getItems());
});

describe("TaskManipulation Continued", () => {
  describe("updateTask", () => {
    test('Task description will update to Task Updated', () => {
      TaskManipulation.updateTask(0, "Task Updated", testTasks.getItems());
      expect(testTasks.getItems()[0].description).toBe("Task Updated");
    });

    test("Task description will not update to empty string", () => {
      TaskManipulation.updateTask(0, "", testTasks.getItems());
      expect(testTasks.getItems()[0].description).toBe("Task Updated");
    });

    test("Task description will be updated in localstorage", () => { 
      expect(testTasks.getItems()[0].description).toBe("Task Updated");
    });
  });

  describe("updateStatus", () => { 
    test("checked attribute of task 0 should be true", () => {
      UpdateTaskStatus.updateTaskStatus(0, true, testTasks.getItems());
      renderWithEventListeners(testTasks.getItems());
      expect(testTasks.getItems()[0].checked).toBe(true);
    });

    test("checkbox for task 0 should be checked", () => { 
      const checkbox = document.getElementById("task-list").children[0].children[0].children[0].children[0]
      expect(checkbox.checked).toBe(true);
    })
  });

  describe("clearAllCompletedTask", () => { 
    test("clear all completed tasks", () => {
      TaskManipulation.clearAllCompletedTask(testTasks.getItems());
      expect(testTasks.getItems().length).toBe(2);
    });

    test("clear all completed tasks from the list", () => { 
      renderWithEventListeners(testTasks.getItems());
      const list = document.getElementById("task-list").childNodes.length;
      expect(list).toBe(2);
    });
  })
});