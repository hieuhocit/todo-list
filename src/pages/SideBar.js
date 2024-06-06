import React from "../modules/React";
import CreateElement from "../modules/CreateElement";

class SideBar extends React {
    constructor(props) {
        super(props);
    }

    render() {
        const todoNotifications = this.props.TodoList.getProjects().reduce((acc, project) => [...acc, ...project.getTodos()], []).filter(todo => !todo.getCompleted()).length;

        const todos = (CreateElement({
            tag: "a",
            attributes: [
                { name: "href", value: "#" },
                { name: "name", value: "todos" }
            ],
            textContent: "To Do",
            events: [
                {
                    type: "click",
                    onEvent: this.props.onSwitch
                }
            ],
            children: todoNotifications <= 0 ? [] : [CreateElement({
                tag: "span",
                classList: ["notification"],
                textContent: todoNotifications
            })]
        }));

        const projects = (CreateElement({
            tag: "a",
            attributes: [
                { name: "href", value: "#" },
                { name: "name", value: "projects" }
            ],
            textContent: "Projects",
            events: [
                {
                    type: "click",
                    onEvent: this.props.onSwitch
                }
            ]
        }));

        const projectItems = this.props.TodoList.getProjects().map(project => {
            const projectNotifications = this.props.TodoList.getProject(project.title).getTodos().filter(todo => !todo.getCompleted()).length;
            return CreateElement({
                tag: "li",
                children: [
                    CreateElement({
                        tag: "a",
                        attributes: [
                            { name: "href", value: "#" },
                            { name: "name", value: project.getTitle() }
                        ],
                        textContent: project.getTitle(),
                        events: [
                            {
                                type: "click",
                                onEvent: this.props.onSwitch
                            }
                        ],
                        children: projectNotifications <= 0 ? [] : [CreateElement({
                            tag: "span",
                            classList: ["notification"],
                            textContent: projectNotifications
                        })]
                    })
                ]
            })
        });

        const containerProjectItems = CreateElement({
            tag: "ul",
            classList: ["container-project"],
            children: projectItems
        });


        const ul = CreateElement({
            tag: "ul",
            children: [
                CreateElement({
                    tag: "li",
                    children: [todos]
                })
                ,
                CreateElement({
                    tag: "li",
                    children: [projects]
                }),
                CreateElement({
                    tag: "li",
                    children: [containerProjectItems]
                })
            ]
        });

        const add = CreateElement({
            tag: "button",
            classList: ["btn", "btn-add"],
            textContent: "+",
            events: [
                { type: "click", onEvent: this.props.onShowAdd }
            ]
        });

        const sidebar = CreateElement({
            tag: "nav",
            classList: ["sidebar"],
            children: [ul, add]
        });
        sidebar.querySelector(`a[name="${this.props.onTab}"]`).classList.add("active");
        return sidebar;
    }
}

export default SideBar;