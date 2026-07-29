// ==========================================
// Workspace Navigation
// ==========================================

const WorkspaceNavigation = {

    render() {

        const container = document.getElementById("workspace-navigation");

        if (!container) return;

        container.innerHTML = `

            <nav class="workspace-navigation">

                <button onclick="ProjectWorkspace.show('overview')">
                    Übersicht
                </button>

                <button onclick="ProjectWorkspace.show('tasks')">
                    Aufgaben
                </button>

                <button onclick="ProjectWorkspace.show('meetings')">
                    Meetings
                </button>

                <button onclick="ProjectWorkspace.show('calendar')">
                    Kalender
                </button>

                <button onclick="ProjectWorkspace.show('documents')">
                    Dokumente
                </button>

                <button onclick="ProjectWorkspace.show('contacts')">
                    Kontakte
                </button>

                <button onclick="ProjectWorkspace.show('activity')">
                    Aktivitäten
                </button>

                <button onclick="ProjectWorkspace.show('settings')">
                    Einstellungen
                </button>

            </nav>

        `;

    }

};
