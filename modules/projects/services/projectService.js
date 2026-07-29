// ==========================================
// LumaFlow
// Project Service
// ==========================================

const ProjectService = {

    projects: [],

    init() {

        this.projects = ProjectStorage.load();

    },

    getAll() {

        return this.projects;

    },

    getById(id) {

        return this.projects.find(

            project => project.id === id

        );

    },

    create(data) {

        const project = new ProjectModel(data);

        this.projects.push(project);

        this.save();

        return project;

    },

    update(id, data) {

        const project = this.getById(id);

        if (!project) return;

        Object.assign(project, data);

        project.updatedAt = new Date().toISOString();

        this.save();

    },

    delete(id) {

        this.projects = this.projects.filter(

            project => project.id !== id

        );

        this.save();

    },

    search(text) {

        text = text.toLowerCase();

        return this.projects.filter(project =>

            project.name.toLowerCase().includes(text) ||

            project.number.toLowerCase().includes(text) ||

            project.customer.toLowerCase().includes(text)

        );

    },

    filter(status) {

        if (!status)

            return this.projects;

        return this.projects.filter(

            project => project.status === status

        );

    },

    sort(field = "name") {

        return [...this.projects].sort((a, b) =>

            String(a[field])

                .localeCompare(String(b[field]))

        );

    },

    save() {

        ProjectStorage.save(this.projects);

    }

};
