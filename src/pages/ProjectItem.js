import React from "../modules/React";
import CreateElement from "../modules/CreateElement";
import TodoItem from "./TodoItem";


class ProjectItem extends React {
    constructor(props) {
        super(props);
    }

    render() {
        const projects = CreateElement({
            tag: "div",
            classList: ["projects"]
        });

        this.props.projects.map(project => {
            const title = CreateElement({
                tag: "h3",
                classList: ["project-title"],
                textContent: project.getTitle()
            });

            const itemProject = CreateElement({
                tag: "div",
                classList: ["project"],
                attributes: [
                    { name: "name", value: project.getTitle() }
                ],
                children: [title]
            });

            project.getTodos().map(todo => {
                new TodoItem({ item: todo, projectName: project.getTitle(), onDelete: this.props.onDelete, onShowDetail: this.props.onShowDetail, onEdit: this.props.onEdit, onChange: this.props.onChange }).createRoot(itemProject);
            });

            if(project.getTodos().length === 0) {
                const btnDelete = CreateElement({
                    tag: "button",
                    textContent: "Delete Project",
                    classList: ["btn", "delete-project"],
                    attributes: [
                        {name: "key", value: project.getTitle()}
                    ],
                    events: [
                        {type: "click", onEvent: this.props.onDeleteProject}
                    ]
                });
                itemProject.appendChild(btnDelete);
            }

            projects.appendChild(itemProject);
        });

        return projects;
    }
}

export default ProjectItem;