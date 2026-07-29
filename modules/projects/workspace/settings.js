// ==========================================
// Workspace Settings
// ==========================================

const WorkspaceSettings = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        container.innerHTML = `

            <div class="workspace-module">

                <h2>Projekteinstellungen</h2>

                <div class="card">

                    <button
                        class="btn"
                        onclick="editProject('${project.id}')">

                        Projekt bearbeiten

                    </button>

                    <br><br>

                    <button
                        class="btn">

                        Projekt archivieren

                    </button>

                    <br><br>

                    <button
                        class="btn btn-danger">

                        Projekt löschen

                    </button>

                </div>

            </div>

        `;

    }

};
