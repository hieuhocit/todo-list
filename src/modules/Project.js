class Project {
    constructor(title, todos) {
        this.title = title;
        this.todos = todos;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setTodos(todos) {
        this.todos = todos;
    }

    getTodos() {
        return this.todos;
    }

    getIndexTodo(todoTitle) {
        return this.todos.findIndex(todo => todo.title === todoTitle);
    }

    containsTodo(todoTitle) {
        return this.todos.some(todo => todo.title.toLowerCase() === todoTitle.trim().toLowerCase());
    }

    addTodo(todo) {
        if (this.containsTodo(todo.title)) return;
        this.todos.push(todo);
    }

    getTodo(todoTitle) {
        return this.todos.find(todo => todo.title === todoTitle);
    }

    deleteTodo(todoTitle) {
        this.todos = this.todos.filter(todo => todo.title !== todoTitle);
    }
}

export default Project;