import React from "../modules/React";
import CreateElement from "../modules/CreateElement";
import Todo from "../modules/Todo";
import Project from "../modules/Project";


class Add extends React {
    constructor(props) {
        super(props);
        this.state = {
            onTab: "todo"
        }
    }

    handleClosePopup = (popup) => {
        popup.remove();
    }

    handleSwitchTab = (e, popup) => {
        if (e.target.name === this.state.onTab) return;
        this.setState({ onTab: e.target.name }, false);
        popup.remove();
        this.root.appendChild(this.render());
    }

    handleAdd = (e) => {
        e.preventDefault();
        const item = {};
        const inputs = e.target.querySelectorAll("[name]");
        inputs.forEach(input => {
            if (input.type === "date") {
                item[input.name] = new Date(input.value);
            } else if (input.type === "checkbox") {
                item[input.name] = input.checked;
            }
            else {
                item[input.name] = input.value;
            }
        });

        if (item.project) {
            const todo = new Todo(item.title, item.description, new Date(), new Date(item.dueDate), item.priority, item.completed)
            this.props.onAddTodo(todo, item.project);
        } else {
            const project = new Project(item.title, []);
            this.props.onAddProject(project);
        }
    }

    render() {
        const popup = CreateElement({
            tag: "div",
            classList: ["popup"],
        });

        const add = CreateElement({
            tag: "div",
            classList: ["create"],
            attributes: [
                {
                    name: "name",
                    value: "create"
                }
            ],
        });

        add.innerHTML = `<h2 class="heading">Create a new ...</h2>`;

        const createTodo = CreateElement({
            tag: "a",
            attributes: [{ name: "href", value: "#" }, { name: "name", value: "todo" }],
            textContent: "Todo",
            events: [
                { type: "click", onEvent: (e) => this.handleSwitchTab(e, popup) }
            ]
        });

        const createProject = CreateElement({
            tag: "a",
            attributes: [{ name: "href", value: "#" }, { name: "name", value: "project" }],
            textContent: "Project",
            events: [
                { type: "click", onEvent: (e) => this.handleSwitchTab(e, popup) }
            ]
        });

        const sidebar = CreateElement({
            tag: "div",
            classList: ["sidebar"],
            children: [CreateElement({
                tag: "ul",
                children: [
                    CreateElement({
                        tag: "li",
                        children: [createTodo]
                    }),
                    CreateElement({
                        tag: "li",
                        children: [createProject]
                    })
                ]
            }),]
        });


        const content = CreateElement({
            tag: "form",
            classList: ["editor"],
            events: [
                { type: "submit", onEvent: this.handleAdd }
            ]
        })

        if (this.state.onTab === "todo") {
            createTodo.classList.add("active");
            content.innerHTML = `
                <label>
                    <span>Title: </span>
                    <input type="text" name="title" required/>
                </label>
                <label>
                    <span>Description: </span>
                    <input type="text" name="description" required/>
                </label>
                <label>
                    <span>DueDate: </span>
                    <input type="date" name="dueDate" required/>
                </label>
                <label>
                    <span>Priority: </span>
                    <input type="number" name="priority" min="1" max="3" required/>
                </label>
                <label>
                    <span>Completed: </span>
                    <input type="checkbox" name="completed"/>
                </label>
            `;
            const options = this.props.projects.map((project) => CreateElement({
                tag: "option",
                attributes: [{ name: "value", value: project.getTitle() }],
                textContent: project.getTitle()
            }));
            const label = CreateElement({
                tag: "label",
                children: [
                    CreateElement({
                        tag: "span",
                        textContent: "Project: "
                    }),
                    CreateElement({
                        tag: "select",
                        attributes: [
                            { name: "name", value: "project" },
                            { name: "required", value: true }
                        ],
                        children: options
                    }),
                ]
            });

            const btnAddTodo = CreateElement({
                tag: "button",
                classList: ["btn"],
                textContent: "Add Todo",
                attributes: [{ name: "type", value: "submit" }],
            });

            content.appendChild(label);
            content.appendChild(btnAddTodo);
        } else {
            createProject.classList.add("active");
            content.innerHTML = `
                <label>
                    <span>Title: </span>
                    <input type="text" name="title" required/>
                </label>
            `;
            const btnAddProject = CreateElement({
                tag: "button",
                classList: ["btn"],
                textContent: "Add Project",
                attributes: [{ name: "type", value: "submit" }],
            });
            content.appendChild(btnAddProject);
        }

        const btnClose = CreateElement({
            tag: "i",
            classList: ["btn-close", "fa-solid", "fa-xmark"],
            events: [
                {
                    type: "click",
                    onEvent: () => this.handleClosePopup(popup)
                }
            ]
        });

        add.appendChild(sidebar);
        add.appendChild(content);
        add.appendChild(btnClose);
        popup.appendChild(add);

        return popup;
    }
}

export default Add;