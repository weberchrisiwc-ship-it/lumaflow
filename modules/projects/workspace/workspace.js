// ==========================================
// LumaFlow
// Project Workspace
// ==========================================

const ProjectWorkspace = {

    render(project) {

        if (!project) return;

        setPage(`

            <div class="project-workspace">

                <div id="workspace-header"></div>

                <div id="workspace-navigation"></div>

                <div id="workspace-content"></div>

            </div>

        `);

        ProjectWorkspace.renderHeader(project);

        ProjectWorkspace.renderNavigation(project);

        ProjectWorkspace.showOverview(project);

    },

    renderHeader(project) {

        document.getElementById("workspace-header").innerHTML = `

            <div class="workspace-header">

                <div>

                    <h1>${project.number}</h1>

                    <p>${project.name}</p>

                </div>

                <div>

                    <span class="badge">

                        ${project.status}

                    </span>

                </div>

            </div>

        `;

    },

    renderNavigation(project) {

        document.getElementById("workspace-navigation").innerHTML = `

            <div class="workspace-navigation">

                <button class="btn btn-primary"
                    onclick="ProjectWorkspace.showOverview(currentProject)">
                    Übersicht
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showTasks(currentProject)">
                    Aufgaben
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showMeetings(currentProject)">
                    Meetings
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showCalendar(currentProject)">
                    Kalender
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showDocuments(currentProject)">
                    Dokumente
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showContacts(currentProject)">
                    Kontakte
                </button>

                <button class="btn"
                    onclick="ProjectWorkspace.showActivity(currentProject)">
                    Aktivitäten
                </button>

            </div>

        `;

    },

    showOverview(project) {

        document.getElementById("workspace-content").innerHTML = `

            <h2>Projektübersicht</h2>

            <div class="cards">

                <div class="card">

                    <h3>🔥 Aufgaben</h3>

                    <h1>${project.tasks.length}</h1>

                </div>

                <div class="card">

                    <h3>📅 Meetings</h3>

                    <h1>${project.meetings.length}</h1>

                </div>

                <div class="card">

                    <h3>📄 Dokumente</h3>

                    <h1>${project.documents.length}</h1>

                </div>

                <div class="card">

                    <h3>👥 Kontakte</h3>

                    <h1>${project.contacts.length}</h1>

                </div>

            </div>

        `;

    },

    showTasks(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Aufgaben</h2>
            <p>Modul folgt.</p>
        `;

    },

    showMeetings(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Meetings</h2>
            <p>Modul folgt.</p>
        `;

    },

    showCalendar(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Kalender</h2>
            <p>Modul folgt.</p>
        `;

    },

    showDocuments(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Dokumente</h2>
            <p>Modul folgt.</p>
        `;

    },

    showContacts(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Kontakte</h2>
            <p>Modul folgt.</p>
        `;

    },

    showActivity(project) {

        document.getElementById("workspace-content").innerHTML = `
            <h2>Aktivitäten</h2>
            <p>Modul folgt.</p>
        `;

    }

};
