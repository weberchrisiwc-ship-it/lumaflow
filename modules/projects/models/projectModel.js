// ==========================================
// LumaFlow - Project Model
// ==========================================

const ProjectModel = {

    create() {

        return {

            id: crypto.randomUUID(),

            number: "",

            name: "",

            customer: "",

            status: "Planung",

            tasks: [],

            meetings: [],

            protocols: [],

            contacts: [],

            documents: [],

            created: new Date().toISOString()

        };

    }

};
