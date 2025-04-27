import { Project } from "./CreateProject";
import StorageManager from "./storage";

class ManageProjects {
  constructor() {
    this.storage = new StorageManager();
    const loadedProjects = this.storage.load();

    if (loadedProjects) {
      this.projects = loadedProjects.map((projData) => {
        const proj = new Project(projData.name);
        proj.id = projData.id;
        proj.todoManager.todos = projData.todoManager.todos;
        return proj;
      });
    } else {
      this.projects = [];
      this.createProject("Default");
      const defaultId = this.projects[0].id;
      this.addTodo(
        defaultId,
        "Buy Groceries",
        "Milk, eggs, bread",
        "2025-04-30",
        "high",
        "Use coupons",
        false,
      );
      this.addTodo(
        defaultId,
        "Finish Homework",
        "Math homework",
        "2025-05-02",
        "meh",
        "Review formulas",
        false,
      );
      this.addTodo(
        defaultId,
        "Clean the House",
        "Mop & vacuum",
        "2025-05-01",
        "low",
        "Focus kitchen",
        false,
      );
      this.save();
    }
  }

  save() {
    this.storage.save(this.projects);
  }

  createProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.save();
    console.log("Created project:", project);
  }

  deleteProject(id) {
    this.projects = this.projects.filter((proj) => proj.id !== id);
    this.save();
  }

  getProjects() {
    return this.projects;
  }

  findProjIndex(id) {
    return this.projects.findIndex((proj) => proj.id === id);
  }

  addTodo(projId, title, desc, due, priority, notes, check) {
    let index = this.findProjIndex(projId);
    this.projects[index].addTodo(title, desc, due, priority, notes, check);
    this.save();
  }

  deleteTodo(projId, id) {
    let index = this.findProjIndex(projId);
    this.projects[index].deleteTodo(id);
    this.save();
  }

  toggleTodo(projId, id) {
    let index = this.findProjIndex(projId);
    this.projects[index].toggleTodo(id);
    this.save();
  }
  reset() {
    this.projects = [];
    this.storage.clear();
  }
}

export { ManageProjects };
