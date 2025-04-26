import { Project } from "./CreateProject";

class ManageProjects {
  constructor() {
    this.projects = [];
  }

  createProject(id, name) {
    let project = new Project(id, name);
    this.projects.push(project);
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
}

export { ManageProjects };
