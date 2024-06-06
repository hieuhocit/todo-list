class Todo {
    constructor(title, description, dateCreated, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.dateCreated = dateCreated;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
    
    getTitle() {
        return this.title;
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    getDescription() {
        return this.description;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    getDateCreated() {
        return this.dateCreated;
    }

    setDateCreated(newDateCreated) {
        this.dateCreated = newDateCreated;
    }

    getDueDate() {
        return this._dueDate;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }

    getCompleted() {
        return this.completed;
    }

    setCompleted(newCompleted) {
        this.completed = newCompleted;
    }
}

export default Todo;