// ==========================================
// Project Storage Service
// ==========================================

const PROJECT_STORAGE_KEY = "lumaflow_projects";

const ProjectStorage = {

    load() {

        try {

            const data = localStorage.getItem(PROJECT_STORAGE_KEY);

            if (!data) return [];

            return JSON.parse(data);

        } catch (error) {

            console.error("Fehler beim Laden der Projekte:", error);

            return [];

        }

    },

    save(projects) {

        try {

            localStorage.setItem(
                PROJECT_STORAGE_KEY,
                JSON.stringify(projects)
            );

        } catch (error) {

            console.error("Fehler beim Speichern:", error);

        }

    },

    clear() {

        localStorage.removeItem(PROJECT_STORAGE_KEY);

    }

};
