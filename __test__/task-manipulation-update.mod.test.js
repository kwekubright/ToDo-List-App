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
});