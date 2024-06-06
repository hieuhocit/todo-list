import Storage from "./Storage";

class React {
    constructor(props) {
        this.props = props;
    }

    createRoot(root) {
        this.root = root;
        this.root.appendChild(this.render());
    }

    setState(newState, renderNow = true) {
        if (typeof newState === "function") {
            this.state = newState(this.state);
        } else {
            this.state = newState;
        }
        
        Storage.storeData(this.state);

        if (renderNow) {
            this.root.innerHTML = "";
            this.root.appendChild(this.render());
        }
    }
}

export default React;