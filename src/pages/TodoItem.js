import React from "../modules/React";
import CreateElement from "../modules/CreateElement";

class TodoItem extends React {
    constructor(props) {
        super(props);
    }

    #handleFormatDate(date) {
        let [month, day, year] = [
            date.getMonth(),
            date.getDate(),
            date.getFullYear(),
        ];
        month++;
        month = month.toString().padStart(2, "0");
        day = day.toString().padStart(2, "0");
        return `${day}/${month}/${year}`;
    }

    handleChange(e, title, projectName) {
        this.props.onChange(title, projectName, e.target.name, e.target.checked);
    }

    render() {
        // Info container
        const infoContainer = CreateElement({
            tag: "div",
            classList: ["info-container"],
        });

        infoContainer.innerHTML += `
            <p class="title">${this.props.item.title}</p>
            <p class="date-created">${this.#handleFormatDate(this.props.item.dateCreated)}</p>
        `;

        const checkbox = CreateElement({
            tag: "input",
            attributes: [
                {
                    name: "type",
                    value: "checkbox"
                },
                {
                    name: "name",
                    value: "completed"
                },
                {
                    name: "id",
                    value: "completed"
                },
                {
                    name: this.props.item.completed && "checked",
                    value: true
                }
            ],
            events: [
                {
                    type: "change",
                    onEvent: (e) => this.handleChange(e, this.props.item.title, this.props.projectName)
                }
            ]
        });

        infoContainer.insertBefore(checkbox, infoContainer.firstChild);

        // Actions container
        const btnDetail = CreateElement({
            tag: "button",
            textContent: "DETAILS",
            classList: ["detail", "btn"],
            events: [
                {
                    type: "click",
                    onEvent: () => this.props.onShowDetail(this.props.item.title, this.props.projectName)
                }
            ]
        });

        const btnEdit = CreateElement({
            tag: "i",
            classList: ["edit", "fa-regular", "fa-pen-to-square"],
            events: [
                {
                    type: "click",
                    onEvent: () => this.props.onEdit(this.props.item.title, this.props.projectName)
                }
            ]
        });

        const btnDelete = CreateElement({
            tag: "i",
            classList: ["delete", "fa-solid", "fa-trash"],
            events: [
                {
                    type: "click",
                    onEvent: () => this.props.onDelete(this.props.item.title, this.props.projectName)
                }
            ]
        });

        const actionsContainer = CreateElement({
            tag: "div",
            classList: ["actions-container"],
            children: [btnDetail, btnEdit, btnDelete]
        });

        const item = CreateElement({
            tag: "div",
            classList: ["item",`border-left-${this.props.item.priority}`],
            attributes: [
                {
                    name: "data-title",
                    value: this.props.item.title
                }
            ],
            children: [infoContainer, actionsContainer]
        });

        return item;
    }
}

export default TodoItem;