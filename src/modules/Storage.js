import Todo from "./Todo";
import Project from "./Project";
import TodoList from "./TodoList";

const KEY = "MY_DATA_KEY";

export default class {
    static storeData(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }
    static getData() {
        const data = JSON.parse(localStorage.getItem(KEY));

        if (!data) return null;

        const todoList = new TodoList();
        data.TodoList.projects.map(project => {
            const newProject = new Project(project.title, []);
            project.todos.map(todo => {
                const newTodo = new Todo(todo.title, todo.description, new Date(todo.dateCreated), new Date(todo.dueDate), todo.priority, todo.completed);
                newProject.addTodo(newTodo);
            });
            todoList.addProject(newProject);
        });

        return {
            TodoList: todoList,
            onTab: data.onTab
        };
    }
}