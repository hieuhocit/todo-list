import React from "../modules/React";
import CreateElement from "../modules/CreateElement";

class Editor extends React {
    constructor(props) {
        super(props);
    }

    handleClosePopup(popup) {
        popup.remove();
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
        return `${year}-${month}-${day}`;
    }

    handleSave = (edit) => {
        const item = {};
        const inputs = edit.querySelectorAll("input[name]");
        inputs.forEach(input => {
            if (input.type === "date") {
                item[input.name] = new Date(input.value);
            } else if (input.type === "checkbox") {
                item[input.name] = input.checked;
            } else {
                item[input.name] = input.value;
            }
        });
        this.props.onSave(item, this.props.item.title, this.props.projectName);
        edit.parentElement.remove();
    }

    render() {
        const edit = CreateElement({
            tag: "div",
            classList: ["editor"],
            attributes: [
                {
                    name: "name",
                    value: "editor"
                }
            ],
        });

        edit.innerHTML = `
            <label>
                <span>Title: </span>
                <input type="text" name="title" value="${this.props.item.title}"/>
            </label>
            <label>
                <span>Description: </span>
                <input type="text" name="description" value="${this.props.item.description}"/>
            </label>
            <label>
                <span>DateCreated: </span>
                <input type="date" name="dateCreated" value="${this.#handleFormatDate((this.props.item.dateCreated))}"/>
            </label>
            <label>
                <span>DueDate: </span>
                <input type="date" name="dueDate" value="${this.#handleFormatDate((this.props.item.dueDate))}"/>
            </label>
            <label>
                <span>Priority: </span>
                <input type="number" name="priority" value="${this.props.item.priority}" min="1" max="3"/>
            </label>
            <label>
                <span>Completed: </span>
                <input type="checkbox" name="completed" ${this.props.item.completed && "checked"}/>
            </label>
        `;
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

        const btnSave = CreateElement({
            tag: "button",
            classList: ["btn"],
            textContent: "Save",
            events: [
                {
                    type: "click",
                    onEvent: () => this.handleSave(edit)
                }
            ]
        });

        const btnCancel = CreateElement({
            tag: "button",
            classList: ["btn"],
            textContent: "Cancel",
            events: [
                {
                    type: "click",
                    onEvent: () => this.handleClosePopup(popup)
                }
            ]
        });

        const btnContainer = CreateElement({
            tag: "div",
            classList: ["btn-container"],
            children: [btnSave, btnCancel]
        });

        edit.appendChild(btnClose);
        edit.appendChild(btnContainer);

        const popup = CreateElement({
            tag: "div",
            classList: ["popup"],
            children: [edit]
        });

        return popup;
    }
}

export default Editor;