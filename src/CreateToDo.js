class ToDo {
  constructor(
    title,
    desc = "",
    due = "forever",
    priority = "Do I need to do this!!",
    notes = "",
    check = false,
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.due = due;
    this.priority = priority;
    this.notes = notes;
    this.check = check;
  }
}
export { ToDo };
