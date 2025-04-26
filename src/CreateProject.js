import { manageToDo } from "./ManageToDo";

class Project{
    constructor(id,name="default")
    {
        this.id=id;
        this.name=name
        this.todoManager=new manageToDo();
    }
    addTodo(id,title,desc,due,priority,notes,check)
    {
        this.todoManager.createToDo(this,id,title,desc,due,priority,notes,check);
    }

    deleteTodo(id)
    {
        this.todoManager.deleteToDo(id)
    }

    toggleTodo(id)
    {
        this.todoManager.toggleToDo(id)
    }

    displayTodo()
    {
        this.todoManager.displayToDo()
    }
}

export {Project}