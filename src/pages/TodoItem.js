import React from "./React";

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

    handleChange(e, index) {
        this.props.onChange(index, e.target.name, e.target.checked);
    }

    render() {
        const item = document.createElement("div");
        item.setAttribute("data-key", this.props.key);
        item.className = "item";

        // Info container
        const infoContainer = document.createElement("div");
        infoContainer.className = "info-container";

        infoContainer.innerHTML += `
            <p class="title">${this.props.item.title}</p>
            <p class="date-created">${this.#handleFormatDate(this.props.item.dateCreated)}</p>
        `;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "completed");
        checkbox.setAttribute("id", "completed");
        if (this.props.item.completed) checkbox.setAttribute("checked", true);

        checkbox.addEventListener("change", (e) => this.handleChange(e, this.props.key));

        infoContainer.insertBefore(checkbox, infoContainer.firstChild);


        // Actions container
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "actions-container";

        const btnDetail = document.createElement("button");
        const btnEdit = document.createElement("i");
        const btnDelete = document.createElement("i");

        btnDetail.textContent = "DETAILS";
        btnDetail.className = "detail btn";
        btnEdit.className = "edit fa-regular fa-pen-to-square";
        btnDelete.className = "delete fa-solid fa-trash";

        btnDelete.addEventListener("click", () => this.props.onDelete(this.props.key));
        btnDetail.addEventListener("click", () => this.props.onShowDetail(this.props.key));
        btnEdit.addEventListener("click", () => this.props.onEdit(this.props.key));

        actionsContainer.appendChild(btnDetail);
        actionsContainer.appendChild(btnEdit);
        actionsContainer.appendChild(btnDelete);

        // Append 
        item.appendChild(infoContainer);
        item.appendChild(actionsContainer);

        return item;
    }
}

export default TodoItem;