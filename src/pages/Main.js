import React from "../modules/React";
import CreateElement from "../modules/CreateElement";
import TodoItem from "./TodoItem";
import SideBar from "./SideBar";
import ProjectItem from "./ProjectItem";


class Main extends React {
    constructor(props) {
        super(props);
    }

    render() {
        const container = CreateElement({
            tag: "div",
            classList: ["container"]
        });

        if (this.props.onTab === "todos") {
            this.props.TodoList.getProjects().map((project) => {
                project.getTodos().map(todo => {
                    new TodoItem({
                        item: todo,
                        projectName: project.getTitle(),
                        onDelete: this.props.onDelete,
                        onShowDetail: this.props.onShowDetail,
                        onEdit: this.props.onEdit,
                        onChange: this.props.onChange
                    }).createRoot(container);
                })
            });
        } else if (this.props.onTab === "projects") {
            new ProjectItem({
                projects: this.props.TodoList.getProjects(),
                onDelete: this.props.onDelete,
                onShowDetail: this.props.onShowDetail,
                onEdit: this.props.onEdit,
                onChange: this.props.onChange,
                onDeleteProject: this.props.onDeleteProject
            }).createRoot(container);
        }else {
            new ProjectItem({
                projects: [this.props.TodoList.getProject(this.props.onTab)],
                onDelete: this.props.onDelete,
                onShowDetail: this.props.onShowDetail,
                onEdit: this.props.onEdit,
                onChange: this.props.onChange,
                onDeleteProject: this.props.onDeleteProject
            }).createRoot(container);
        }

        const main = CreateElement({
            tag: "div",
            classList: ["main"],
            children: [new SideBar({ 
                TodoList: this.props.TodoList,
                onTab: this.props.onTab, 
                onSwitch: this.props.onSwitch,
                onShowAdd: this.props.onShowAdd
            }).render(), container]
        });

        return main;
    }
}

export default Main;