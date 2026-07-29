// ==========================================
// LumaFlow
// Project Storage
// ==========================================

const ProjectStorage = {

    KEY: "lumaflow-projects",

    load() {

        const json = localStorage.getItem(this.KEY);

        if (!json) return [];

        try {

            return JSON.parse(json);

        }

        catch (error) {

            console.error(error);

            return [];

        }

    },

    save(projects) {

        localStorage.setItem(

            this.KEY,

            JSON.stringify(projects)

        );

    }

};
