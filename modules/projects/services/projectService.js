// ==========================================
// LumaFlow - Project Service
// ==========================================

const ProjectService = {

    getAll() {

        return ProjectStorage.load();

    },

    saveAll(projects) {

        ProjectStorage.save(projects);

    },

    create(project) {

        const projects = this.getAll();

        projects.push(project);

        this.saveAll(projects);

    }

};
