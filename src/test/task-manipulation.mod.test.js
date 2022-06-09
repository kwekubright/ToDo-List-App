/* eslint-disable no-undef */
import { TaskManipulation } from "./task-manipulation.mod";
import { Tasks } from '../modules/task.mod.js';



  describe('add task and remove task' , () => { 
    document.body.innerHTML = `
      <div>
        <ul id="task-list">
            
        </ul>
        <input id="new-task" value="something">
          
        </input>
      </div>
    `;
    test('add a task', () => {
      
     TaskManipulation.addTask()
     expect(Tasks.length).toBe(1);
  })

  test('Remove a task', () => {
      
    TaskManipulation.removeTask()
    expect(Tasks.length).toBe(0);
 })
 
});