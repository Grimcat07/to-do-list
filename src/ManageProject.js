import { Project } from "./CreateProject";

class ManageProjects {
  constructor() {
    this.projects = [];
  }
  createProject(name) {
    this.project = new Project(name);
    this.projects.push(this.project);
    console.log("came to manage projects");
    console.log(this.projects);
  }
  deleteProject(id) {
    this.projects = this.projects.filter((proj) => proj.id !== id);
  }

  displayProject() {
    this.projects.forEach((project) => {
      console.log(`Project: ${project.name}`);
      project.todoManager.todos.forEach((todo) => {
        console.log(`  Title: ${todo.title}, Due: ${todo.due}`);
      });
    });
  }
  getProjects() {
    return this.projects;
  }
  getTodo() {
    let todos = this.project.getTodo();
    return todos;
  }
  findProjIndex(id) {
    return this.projects.findIndex((proj) => proj.id === id);
  }
  addTodo(projId, title, desc, due, priority, notes, check) {
    let index = this.findProjIndex(projId);
    this.projects[index].addTodo(title, desc, due, priority, notes, check);
  }
  deleteTodo(projId, id) {
    let index = this.findProjIndex(projId);
    this.projects[index].deleteTodo(id);
  }
  toggleTodo(projId, id) {
    let index = this.findProjIndex(projId);
    this.projects[index].toggleTodo(id);
  }
}

export { ManageProjects };
