export default class LocalStorage {
  constructor() {
    this.localStorage = [];
  }

  static setItems = (obj) => {
    localStorage.setItem('tasks', JSON.stringify(obj));
  };

  static getItems = () => {
    this.localStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
    return this.localStorage;
  };
}