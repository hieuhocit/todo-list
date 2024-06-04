import TodoItem from "./TodoItem";

export default function () {
    let todos = "<div class='todo-container'>";
    for(let i = 0; i < 5; i++) {
        todos += TodoItem(i);
    }
    todos += "</div>";
    return todos;
}