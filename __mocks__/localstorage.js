export default class LocalStorage {
  constructor() {
    this.localStorage = [
      { id: 1, description: 'task 1', completed: false },
      { id: 2, description: 'task 2', completed: false },
      { id: 3, description: 'task 3', completed: false },
    ];
  }

  getItems() {
    return this.localStorage;
  }

  setItems(value) {
    this.localStorage.push(value);
  }
}