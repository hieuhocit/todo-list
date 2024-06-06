import Project from "./Project";

class TodoList {
    constructor() {
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }

    containsProject(projectTitle) {
        return this.projects.some(project => project.title.toLowerCase() === projectTitle.trim().toLowerCase());
    }

    addProject(project) {
        if(this.containsProject(project.title)) return;
        this.projects.push(project);
    }

    getProject(projectTitle) {
        return this.projects.find(project => project.title === projectTitle);
    }

    constainsProject(projectTitle) {
        return this.projects.some(project => project.title === projectTitle);
    }

    deleteProject(projectTitle) {
        this.projects = this.projects.filter(project => project.title !== projectTitle);
    }
}

export default TodoList;