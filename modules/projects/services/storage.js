// ==========================================
// LumaFlow - Project Storage
// ==========================================

const PROJECT_STORAGE_KEY = "lumaflow_projects";

const ProjectStorage = {

    load() {

        try {

            const data = localStorage.getItem(PROJECT_STORAGE_KEY);

            if (!data) return [];

            return JSON.parse(data);

        } catch (error) {

            console.error(error);

            return [];

        }

    },

    save(projects) {

        localStorage.setItem(

            PROJECT_STORAGE_KEY,

            JSON.stringify(projects)

        );

    },

    clear() {

        localStorage.removeItem(PROJECT_STORAGE_KEY);

    }

};
