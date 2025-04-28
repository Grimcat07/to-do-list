import { de } from "date-fns/locale";
import { ManageProjects } from "./ManageProject";

class UIManager {
  constructor() {
    this.projectManager = new ManageProjects();
    this.isEditMode = false;
    this.editProjId = null;
    this.editTodoId = null;
  }
  createProject(name) { 
    const existingProject = this.projectManager
      .getProjects()
      .find((proj) => proj.name === name);
    if (existingProject) {
      console.log("Project with this name already exists");
      return;
    }
    this.projectManager.createProject(name);
    console.log("came to uimanager");
  }
  createTodo(projName, title, desc, due, priority, notes, check) {
   
    let projarr = this.projectManager.getProjects();
    let projIndex = projarr.findIndex((proj) => proj.name == projName);
    this.projectManager.addTodo(
      this.projectManager.projects[projIndex].id,
      title,
      desc,
      due,
      priority,
      notes,
      check,
    );
  }
  deleteTodo(projId, id) {
    this.projectManager.deleteTodo(projId, id);
  }
  deleteProject(id) {
    this.projectManager.deleteProject(id);
  }
  toggleStatus(id) {
    this.projectManager.toggleTodo(id);
  }
  addEvents() {
    const projDialog = document.querySelector("#project_dialog");
    const formDialog = document.querySelector("#todo_dialog");
    const addTodoButton = document.querySelector(".addtodo");
    const addprojButton = document.querySelector(".addproj");
    const close = document.querySelector(".dialog_close");
    const submitProj = document.querySelector(".submitProj");
    const submitTodo = document.querySelector(".submitTodo");
    const viewprojButton = document.querySelector(".viewproj");
    const viewprojdialog = document.querySelector("#view");
    const resetAll = document.querySelector(".reset");

    addTodoButton.addEventListener("click", () => {
      this.addtododialog(formDialog, close, submitTodo);
    });
    addprojButton.addEventListener("click", () => {
      this.addprojectdialog(projDialog, close, submitProj);
    });
    viewprojButton.addEventListener("click", () => {
      this.viewprojects(viewprojdialog, close);
    });
    resetAll.addEventListener("click", () => {
      this.projectManager.reset();
      location.reload();
    });
  }
  addtododialog(formDialog, close, submit) {
    if (this.isEditMode) {
      const projectSelect = document.querySelector("#project_name");
      const proj = this.projectManager.projects.find(
        (p) => p.id === this.editProjId,
      );
      
      const todo = proj.todoManager.todos.find((t) => t.id === this.editTodoId);

      document.querySelector("#todo_title").value = todo.title;
      document.querySelector("#todo_desc").value = todo.desc;
      document.querySelector("#todo_notes").value = todo.notes;
      document.querySelector("#due_date").value = todo.due;
      document.querySelector("#todo_check").checked = todo.check;

      if (todo.priority === "high")
        document.querySelector("#high_priority").checked = true;
      if (todo.priority === "meh")
        document.querySelector("#meh_priority").checked = true;
      if (todo.priority === "low")
        document.querySelector("#low_priority").checked = true;

      projectSelect.value = proj.name;
      projectSelect.disabled = true;
    }

    const projectSelect = document.querySelector("#project_name");
    const projarr = this.projectManager.getProjects();
    projectSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Project";
    projectSelect.appendChild(defaultOption);

    projarr.forEach((proj) => {
      const option = document.createElement("option");
      option.value = proj.name;
      option.textContent = proj.name;
      projectSelect.appendChild(option);
    });
    formDialog.showModal();
    close.addEventListener("click", () => formDialog.close());
    submit.addEventListener("click", (event) => {
      event.preventDefault();

      const todoTitle = document.querySelector("#todo_title");
      const priorityHigh = document.querySelector("#high_priority");
      const priorityMeh = document.querySelector("#meh_priority");
      const priorityLow = document.querySelector("#low_priority");
      const dueDate = document.querySelector("#due_date");
      const todoDesc = document.querySelector("#todo_desc");
      const todoCheck = document.querySelector("#todo_check");
      const todoNotes = document.querySelector("#todo_notes");

      const title = todoTitle.value;
      const priority = priorityHigh.checked
        ? "high"
        : priorityMeh.checked
          ? "meh"
          : priorityLow.checked
            ? "low"
            : "";
      const due = dueDate.value;
      let description = todoDesc.value;
      const isChecked = todoCheck.checked;
      let notes = todoNotes.value;
      let projName = projectSelect.value;

        if (title && priority && due) {
          if (this.isEditMode) {
            this.projectManager.updateTodo(
              this.editProjId,
              this.editTodoId,
              title,
              description,
              due,
              priority,
              notes,
              isChecked,
            );
            const projIndex = this.projectManager.findProjIndex(
              this.editProjId,
            );
            this.render(this.projectManager.projects[projIndex]);
          
          formDialog.close();

          todoTitle.value = "";
          todoDesc.value = "";
          todoNotes.value = "";
          todoCheck.checked = false;
          const priorityArr=document.querySelectorAll(".priority")
          let priorArr=Array.from(priorityArr)
          priorArr.forEach(prior=>prior.checked=false);
          this.isEditMode = false;
          this.editProjId = null;
          this.editTodoId = null;
          projectSelect.disabled = false;
          dueDate.value=""
        }
         else {
          projName=projName? projName : "Default"
          description=description? description : "No Desc"
          notes=notes? notes : "No Notes"
          this.createTodo(
            projName,
            title,
            description,
            due,
            priority,
            notes,
            isChecked,
          );
          let indexProj=projarr.findIndex(proj=>proj.name==projName)
          console.log(this.projectManager.projects[indexProj])
          this.render(this.projectManager.projects[indexProj]);
          formDialog.close();

          todoTitle.value = "";
          todoDesc.value = "";
          todoNotes.value = "";
          todoCheck.checked = false;
          const priorityArr=document.querySelectorAll(".priority")
          let priorArr=Array.from(priorityArr)
          priorArr.forEach(prior=>prior.checked=false);
          dueDate.value="";
        }}
        
    });
  }

  addprojectdialog(projDialog, close, submit) {
    projDialog.showModal();
    close.addEventListener("click", () => {
      projDialog.close();
    });
    submit.addEventListener("click", (event) => {
      event.preventDefault();

      const projtitle = document.querySelector("#proj_name");
      const projectTitle = projtitle.value;
      console.log("come");

      if (projectTitle) {
        this.createProject(projectTitle);
        projDialog.close();

        projtitle.value = "";
      }
    });
  }
  viewprojects(viewprojdialog, close) {
    viewprojdialog.showModal();
    close.addEventListener("click", () => viewprojdialog.close());
    let projarr = this.projectManager.getProjects();
    console.log(projarr);
    const projSelect = document.querySelector("#viewProject");
    projSelect.innerHTML = "";
    const option = document.createElement("option");
    option.innerHTML = "";
    option.textContent = "Select Project";
    option.setAttribute("value", "");
    projSelect.appendChild(option);
    const viewSubmit = document.querySelector(".submitProject");
    projarr.forEach((proj) => {
      const option = document.createElement("option");
      option.setAttribute("value", proj.id);
      option.textContent = `${proj.name}`;
      projSelect.appendChild(option);
    });
    viewSubmit.addEventListener("click", () => {
      if (projSelect.value == "") return;
      else {
        let index = this.projectManager.findProjIndex(projSelect.value);
        this.render(this.projectManager.projects[index]);

        viewprojdialog.close();
      }
    });
  }
  render(proj) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    container.textContent = "";

    let todosarr = proj.getTodo();
    let projid = proj.id;
    const projNameHeader=document.querySelector(".projectNameHeader")
    projNameHeader.textContent=`Project : ${proj.name}`
    const delProjButton=document.createElement("button")
    delProjButton.classList.add("delProjButton")
    delProjButton.textContent="Delete Project"
    delProjButton.addEventListener("click",()=>{
      this.deleteProject(projid)
      location.reload();
    })
    projNameHeader.appendChild(delProjButton)
    todosarr.forEach((todo) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoDiv.setAttribute("data-id", projid);
      todoDiv.setAttribute("data-priority", todo.priority);

      const titleEl = document.createElement("h3");
      titleEl.textContent = `${todo.title}`;
      titleEl.classList.add("title");

      const descEl = document.createElement("p");
      descEl.textContent = `Description: ${todo.desc}`;

      const dueEl = document.createElement("p");
      dueEl.textContent = `Due Date: ${todo.due}`;

      const priorityEl = document.createElement("p");
      priorityEl.textContent = `Priority: ${todo.priority}`;

      const notesEl = document.createElement("p");
      notesEl.textContent = `Notes: ${todo.notes}`;

      const statusEl = document.createElement("p");
      statusEl.textContent = `Finished: ${todo.check ? "Yes" : "No"}`;

      const statusCheckbox = document.createElement("input");
      statusCheckbox.type = "checkbox";
      statusCheckbox.classList.add("toggleCheck");
      statusCheckbox.checked = todo.check;

      statusCheckbox.addEventListener("change", () => {
        this.projectManager.toggleTodo(projid, todo.id);
        statusEl.textContent = `Finished: ${todo.check ? "Yes" : "No"}`;
        if(todo.check){
        todoDiv.setAttribute("data-check","yes")}
      });
      if(todo.check){
        todoDiv.setAttribute("data-check","yes")}
      const delDiv = document.createElement("div");
      delDiv.classList.add("delDiv");
      const del = document.createElement("button");
      del.classList.add("delButton");
      del.textContent = "Del";
      del.addEventListener("click", () => {
        this.deleteTodo(projid, todo.id);
        this.render(proj);
      });
      const editBtn = document.createElement("button");
      editBtn.classList.add("editButton");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        const formDialog = document.querySelector("#todo_dialog");
        const close = document.querySelector(".dialog_close");
        const submitTodo = document.querySelector(".submitTodo");
        this.isEditMode = true;
        this.editProjId = projid;
        this.editTodoId = todo.id;
        this.addtododialog(formDialog, close, submitTodo);
      });
      delDiv.appendChild(editBtn);
      delDiv.appendChild(del);
      statusEl.appendChild(statusCheckbox);
      todoDiv.appendChild(titleEl);
      todoDiv.appendChild(descEl);
      todoDiv.appendChild(dueEl);
      todoDiv.appendChild(priorityEl);
      todoDiv.appendChild(notesEl);
      todoDiv.appendChild(statusEl);
      todoDiv.appendChild(delDiv);

      container.appendChild(todoDiv);
    });
  }
}

export { UIManager };
