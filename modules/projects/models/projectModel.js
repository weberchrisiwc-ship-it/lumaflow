// ==========================================
// LumaFlow
// Project Model
// ==========================================

class ProjectModel {

    constructor(data = {}) {

        this.id = data.id || crypto.randomUUID();

        this.number = data.number || "";

        this.name = data.name || "";

        this.customer = data.customer || "";

        this.description = data.description || "";

        this.status = data.status || "Aktiv";

        this.startDate = data.startDate || "";

        this.endDate = data.endDate || "";

        this.contacts = data.contacts || [];

        this.tasks = data.tasks || [];

        this.meetings = data.meetings || [];

        this.documents = data.documents || [];

        this.activity = data.activity || [];

        this.createdAt = data.createdAt || new Date().toISOString();

        this.updatedAt = data.updatedAt || new Date().toISOString();

    }

}
