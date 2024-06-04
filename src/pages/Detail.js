import React from "./React";

class Detail extends React {
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
        return `${day}/${month}/${year}`;
    }

    render() {
        const popup = document.createElement("div");
        const detail = document.createElement("div");
        popup.className = "popup";
        detail.className = "detail";
        detail.innerHTML = `
            <div class="detail">
                <p class="title"><span>Title:</span> ${this.props.item.title}</p>
                <p class="description"><span>Description:</span> ${this.props.item.description}</p>
                <p class="date-created"><span>Date created:</span> ${this.#handleFormatDate(this.props.item.dateCreated)}</p>
                <p class="due-date"><span>Date due:</span> ${this.#handleFormatDate(this.props.item.dueDate)}</p>
                <p class="priority"><span>Priority:</span> ${this.props.item.priority}</p>
                <p class="detail-completed"><span>Completed:</span> ${this.props.item.completed ? "Completed" : "Not completed"}</p>
            </div>
        `;
        const btnClose = document.createElement("i");
        btnClose.className = "btn-close fa-solid fa-xmark";
        btnClose.addEventListener("click", () => this.handleClosePopup(popup));

        detail.appendChild(btnClose);
        popup.appendChild(detail);
        return popup;
    }
}

export default Detail;