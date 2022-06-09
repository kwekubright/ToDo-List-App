import { TaskManipulation } from "../src/modules/task-manipulation.mod";
import LocalStorage from "../__mocks__/localstorage.js";
import { render } from "../src/modules/task.mod";

let index = -1;
let task = class {
  constructor(desc) {
    this.index = index++;
    this.description = desc;
    this.checked = false;
  }
};

let testTasks = [];

for (let i = 0; i < 3; i++) {
  testTasks.push(new task("Task " + i));
}

// Mock local storage
window.localStorage = new LocalStorage();

beforeAll(() => {
  document.body.innerHTML = `<ul id="task-list" class="flex flex-column w-100"></ul>`;
  render(testTasks);
});

describe("TaskManipulation", () => {
  describe("removeTask", () => { 
    test("remove a task from the list", () => {
      TaskManipulation.removeTask(0, testTasks);
      expect(testTasks.length).toBe(2);
    });

    test("removes li element from the list", () => {
      render(testTasks);
      const list = document.getElementById("task-list").childNodes.length;
      expect(list).toBe(2);
    });
  });

  describe("addTask", () => {
    test("add a task to the list", () => {
      TaskManipulation.addTask("Task New", testTasks);
      expect(testTasks.length).toBe(3);
    });

    test("adds li element to the list", () => { 
      render(testTasks);
      const list = document.getElementById("task-list").childNodes.length;
      expect(list).toBe(3);
    });
  });
});