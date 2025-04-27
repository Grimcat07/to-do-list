import { manageToDo } from "./ManageToDo";

class Project {
  constructor(name = "default") {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todoManager = new manageToDo();
  }
  addTodo(title, desc, due, priority, notes, check) {
    this.todoManager.createToDo(title, desc, due, priority, notes, check);
    console.log(`in manage proj`, title, desc, due, priority, notes, check);
  }

  deleteTodo(id) {
    this.todoManager.deleteToDo(id);
  }

  toggleTodo(id) {
    this.todoManager.toggleToDo(id);
  }
  getTodo() {
    return this.todoManager.todos;
  }
  displayTodo() {
    this.todoManager.displayToDo();
  }
}

export { Project };
