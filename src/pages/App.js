import React from "./React";
import TodoItem from "./TodoItem";
import Detail from "./Detail";
import Editor from "./Editor";

class App extends React {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    title: "Todo1",
                    description: "Do something interesting",
                    dateCreated: new Date(),
                    dueDate: new Date("2024-06-10"),
                    priority: 1,
                    completed: false
                },
                {
                    title: "Todo2",
                    description: "Do something interesting",
                    dateCreated: new Date(),
                    dueDate: new Date("2024-06-10"),
                    priority: 1,
                    completed: true
                },
            ]
        }
    }

    handleDelete = (index) => {
        this.setState((state) => {
            const newList = [...state.list];
            newList.splice(index, 1);
            return {
                list: newList
            };
        });
    }

    handleShowDetail = (index) => {
        new Detail({ item: this.state.list[index] }).createRoot(document.body);
    }

    handleEdit = (index) => {
        new Editor({ item: this.state.list[index], onSave: this.handleSave, index }).createRoot(document.body);
    }

    handleSave = (index, item) => {
        this.setState((state) => {
            const newList = [...state.list];
            newList[index] = item;
            return {
                list: newList
            }
        });
    }

    handleChangeCompleted = (index, key, value) => {
        this.setState((state) => {
            const newList = [...state.list];
            newList[index][key] = value;
            return {
                list: newList
            }
        }, false);
    }

    render() {
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        this.state.list.map((item, key) => {
            new TodoItem({ item, key, onDelete: this.handleDelete, onShowDetail: this.handleShowDetail, onEdit: this.handleEdit, onChange: this.handleChangeCompleted }).createRoot(todoContainer);
        });
        return todoContainer;
    }
}

export default App;