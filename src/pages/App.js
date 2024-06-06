import React from "../modules/React";
import CreateElement from "../modules/CreateElement";
import Detail from "./Detail";
import Editor from "./Editor";
import Main from "./Main";
import TodoList from "../modules/TodoList";
import Add from "./Add";
import Storage from "../modules/Storage";
import Project from "../modules/Project";
import Todo from "../modules/Todo";

class App extends React {
    constructor(props) {
        super(props);
        this.state = Storage.getData() || {
            TodoList: new TodoList(),
            onTab: "todos"
        }
    }

    handleDelete = (title, projectName) => {
        this.setState((state) => {
            state.TodoList.getProject(projectName).deleteTodo(title);
            return state;
        });
    }

    handleShowDetail = (title, projectName) => {
        const item = this.state.TodoList.getProject(projectName).getTodo(title);
        new Detail({ item, projectName }).createRoot(document.body);
    }

    handleEdit = (title, projectName) => {
        const item = this.state.TodoList.getProject(projectName).getTodo(title);
        new Editor({ item, onSave: this.handleSave, projectName }).createRoot(document.body);
    }

    handleSave = (item, title, projectName) => {
        this.setState((state) => {
            const index = state.TodoList.getProject(projectName).getIndexTodo(title);
            const newTodo = new Todo(item.title, item.description, new Date(item.dateCreated), new Date(item.dueDate), item.priority, item.completed);
            state.TodoList.getProject(projectName).getTodos()[index] = newTodo;
            return state;
        });
        console.log(this.state)
    }

    handleChangeCompleted = (title, projectName, key, value) => {
        this.setState((state) => {
            state.TodoList.getProject(projectName).getTodo(title)[key] = value;
            return state;
        });
    }

    handleSwitch = (e) => {
        if (e.target.name === this.state.onTab) return;
        this.setState(state => ({
            ...state,
            onTab: e.target.name
        }));
    }

    handleDeleteProject = (e) => {
        const projectName = e.target.getAttribute("key");
        this.setState(state => {
            state.TodoList.deleteProject(projectName);
            state.onTab = "todos"
            return state;
        });
    }

    handleShowAdd = () => {
        new Add({
            projects: this.state.TodoList.getProjects(),
            onAddTodo: this.handleAddTodo,
            onAddProject: this.handleAddProject
        }).createRoot(document.body);
    }

    handleAddTodo = (todo, projectName) => {
        this.setState(state => {
            const project = this.state.TodoList.getProject(projectName);
            project.addTodo(todo);
            return state;
        });
    }

    handleAddProject = (project) => {
        this.setState(state => {
            this.state.TodoList.addProject(project);
            return state;
        });
    }

    render() {
        const heading = CreateElement({
            tag: "h1",
            textContent: "Todo List",
            classList: ["heading"]
        });

        const app = CreateElement({
            tag: "div",
            attributes: [
                {
                    name: "id",
                    value: "root"
                }
            ],
            children: [heading]
        });

        new Main({
            TodoList: this.state.TodoList,
            onTab: this.state.onTab,
            onDelete: this.handleDelete,
            onShowDetail: this.handleShowDetail,
            onEdit: this.handleEdit,
            onChange: this.handleChangeCompleted,
            onSwitch: this.handleSwitch,
            onDeleteProject: this.handleDeleteProject,
            onShowAdd: this.handleShowAdd
        }).createRoot(app);

        return app;
    }
}

export default App;