

function createToDo(project,title,desc,due,priority,notes,check){
    const todos=[] 
    let todo=new ToDo(project,title,desc,due,priority,notes,check)
    todos.push(todo);
    return todos;
}
class ToDo{
    constructor(project,title,desc,due,priority,notes="",check=false)
    {
        this.project=project;
        this.title=title;
        this.desc=desc;
        this.due=due;
        this.priority=priority;
        this.notes=notes;
        this.check=check;
    }
}
export {createToDo}