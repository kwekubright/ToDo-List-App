export default class LocalStorage {
  constructor() {
    this.localStorage = [];
  }

  getItems = () => {
    return this.localStorage;
  }

  setItems = (value) => {
    this.localStorage.push(value);
  }
}