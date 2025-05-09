import { ToDo } from "./CreateToDo.js";
class manageToDo {
  constructor() {
    this.todos = [];
  }
  createToDo(title, desc, due, priority, notes, check) {
    let todo = new ToDo(title, desc, due, priority, notes, check);
    this.todos.push(todo);
  }

  deleteToDo(id) {
    let index = this.findIndex(id);
    if (index === -1) {
      return;
    }
    this.todos.splice(index, 1);
    this.displayToDo();
  }
  findIndex(id) {
    let index = this.todos.findIndex((todo) => todo.id === id);
    return index;
  }

  toggleToDo(id) {
    let index = this.findIndex(id);
    this.todos[index].check = !this.todos[index].check;
    this.displayToDo();
  }
  getToDo() {
    return this.todos;
  }
  displayToDo() {
    console.log(this.todos);
  }
}

export { manageToDo };
