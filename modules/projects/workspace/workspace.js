// ==========================================
// LumaFlow
// Project Workspace Controller
// ==========================================

const ProjectWorkspace = {

    currentProject: null,

    open(projectId) {

        const project = ProjectService.getById(projectId);

        if (!project) {
            console.error("Projekt nicht gefunden.");
            return;
        }

        this.currentProject = project;

        this.render();

    },

    render() {

        setPage(`

            <div class="project-workspace">

                <div id="workspace-header"></div>

                <div id="workspace-navigation"></div>

                <div id="workspace-content"></div>

            </div>

        `);

        WorkspaceHeader.render(this.currentProject);

        WorkspaceNavigation.render();

        WorkspaceOverview.render(this.currentProject);

    },

    show(tab) {

        switch (tab) {

            case "overview":
                WorkspaceOverview.render(this.currentProject);
                break;

            case "tasks":
                WorkspaceTasks.render(this.currentProject);
                break;

            case "meetings":
                WorkspaceMeetings.render(this.currentProject);
                break;

            case "calendar":
                WorkspaceCalendar.render(this.currentProject);
                break;

            case "documents":
                WorkspaceDocuments.render(this.currentProject);
                break;

            case "contacts":
                WorkspaceContacts.render(this.currentProject);
                break;

            case "activity":
                WorkspaceActivity.render(this.currentProject);
                break;

            case "settings":
                WorkspaceSettings.render(this.currentProject);
                break;

        }

    }

};
