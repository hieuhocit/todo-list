import React from "./React";

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
        this.props.onSave(this.props.index, item);
        edit.parentElement.remove();
    }

    render() {
        const popup = document.createElement("div");
        const edit = document.createElement("div");
        popup.className = "popup";
        edit.className = "editor";
        edit.setAttribute("name", "editor");

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
        const btnClose = document.createElement("i");
        const btnContainer = document.createElement("div");
        const btnSave = document.createElement("button");
        const btnCancel = document.createElement("button");

        btnSave.textContent = "Save";
        btnCancel.textContent = "Cancel";

        btnContainer.className = "btn-container";
        btnSave.className = "btn";
        btnCancel.className = "btn";

        btnClose.className = "btn-close fa-solid fa-xmark";

        btnClose.addEventListener("click", () => this.handleClosePopup(popup));
        btnCancel.addEventListener("click", () => this.handleClosePopup(popup));
        btnSave.addEventListener("click", () => this.handleSave(edit));

        btnContainer.appendChild(btnSave);
        btnContainer.appendChild(btnCancel);

        edit.appendChild(btnClose);
        edit.appendChild(btnContainer);
        popup.appendChild(edit);
        return popup;
    }
}



export default Editor;