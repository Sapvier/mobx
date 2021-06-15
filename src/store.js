import {
  action,
  autorun,
  makeAutoObservable,
  observable,
  toJS,
  set, flow,
} from "mobx";

export function autoSave(_this, name) {
  const storedJson = localStorage.getItem(name);
  if (storedJson) {
    set(_this, JSON.parse(storedJson));
  }
  autorun(() => {
    const value = toJS(_this);
    localStorage.setItem(name, JSON.stringify(value));
  });
}

class Store {
  count = 0;
  users = [];
  isLoading = false;
  isError = false;

  constructor() {
    makeAutoObservable(this, {
      count: observable,
      users: observable,
      isLoading: observable,
      isError: observable,
      setChecked: action,
      fetchUsers: flow,
      setError: action
    });
    autoSave(this, "Store");
    autorun(() => console.log(this));
  }

  *fetchUsers () {
    yield this.isLoading = true
    yield fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => {
        if (r.ok) this.setSuccessfulLoading()
        return r.json();
      })
      .then((r) => (this.users = this.modifyUsers(r)))
      .catch(e => {
        this.setError()
      })
  }

  setError() {
    this.isError = true
    this.isLoading = false
  }

  setSuccessfulLoading() {
    this.isLoading = false
  }

  modifyUsers(users) {
    return users.map((item) => {
      return { ...item, isChecked: false };
    });
  }

  setChecked(id) {
    this.users = this.users.map((item) =>
      item.id === +id
        ? toJS({ ...item, isChecked: !item.isChecked })
        : toJS(item)
    );
  }

  increment() {
    this.count += 1;
  }
  decrement() {
    this.count -= 1;
  }
}

export const store = new Store();
