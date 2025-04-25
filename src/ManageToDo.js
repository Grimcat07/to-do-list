import {ToDo} from "./CreateToDo.js"

const manageToDo=function()
{
    const todos=[] 
    let createToDo=function (project,id,title,desc,due,priority,notes,check){
    
    let todo=new ToDo(project,id,title,desc,due,priority,notes,check)
    todos.push(todo);
    return todos;
    }
   let  findIndex=function (id){
        let index=todos.findIndex(todo=>todo.id===id);
        return index;
    }
   let deleteToDo=function (id){
        let index=findIndex(id);
        if(index===-1||index===null||index===undefined){return}
        todos.splice(index,1);
        displayToDo()
    }

   let toggleToDo=function(id){
        let index=findIndex(id);
        todos[index].check= !todos[index].check;
        displayToDo()
    }

   let displayToDo=function(){
        console.log(todos);
    }

    return {
        createToDo,
        deleteToDo,
        toggleToDo,
        displayToDo,
    }
}
export {manageToDo}