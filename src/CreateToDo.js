class ToDo{
    constructor(project,id,title,desc="",due="forever",priority="Do I need to do this!!",notes="",check=false)
    {
        this.project=project;
        this.id=id
        this.title=title;
        this.desc=desc;
        this.due=due;
        this.priority=priority;
        this.notes=notes;
        this.check=check;
    }
}
export {ToDo}