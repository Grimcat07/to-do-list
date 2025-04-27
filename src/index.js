import "./styles.css";

import { UIManager } from "./UIManager";

const uiManager = new UIManager();

uiManager.createProject("Default");
const projarr = uiManager.projectManager.getProjects();
const defaultProject = projarr.find((proj) => proj.name === "Default");

const defaultTodos = [
  {
    title: "Buy Groceries",
    desc: "Need to buy milk, eggs, and bread.",
    due: "2025-04-30",
    priority: "high",
    notes: "Don't forget to use the coupons.",
    check: false,
  },
  {
    title: "Finish Homework",
    desc: "Complete the math homework on integration.",
    due: "2025-05-02",
    priority: "meh",
    notes: "Revise the formulas.",
    check: false,
  },
  {
    title: "Clean the House",
    desc: "Vacuum and mop the floors.",
    due: "2025-05-01",
    priority: "low",
    notes: "Focus on the kitchen.",
    check: false,
  },
];

defaultTodos.forEach((todo) => {
  uiManager.createTodo(
    defaultProject.name,
    todo.title,
    todo.desc,
    todo.due,
    todo.priority,
    todo.notes,
    todo.check,
  );
});

uiManager.addEvents();
