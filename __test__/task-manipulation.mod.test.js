import { TaskManipulation } from "../src/modules/task-manipulation.mod";
import LocalStorage from "../__mocks__/localstorage.js";
import { renderWithEventListeners } from "../src/modules/task.mod";

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

describe("TaskManipulation", () => {
  describe("removeTask", () => {
    test("remove a task from the list", () => {
      TaskManipulation.removeTask(0, testTasks.getItems());
      expect(testTasks.getItems().length).toBe(2);
    });

    test("removes li element from the list", () => {
      renderWithEventListeners(testTasks.getItems());
      const list = document.getElementById("task-list").childNodes.length;
      expect(list).toBe(2);
    });
  });

  describe("addTask", () => {
    test("add a task to the list", () => {
      TaskManipulation.addTask("Task New", testTasks.getItems());
      expect(testTasks.getItems().length).toBe(3);
    });

    test("adds li element to the list", () => {
      renderWithEventListeners(testTasks.getItems());
      const list = document.getElementById("task-list").childNodes.length;
      expect(list).toBe(3);
    });
  });
});