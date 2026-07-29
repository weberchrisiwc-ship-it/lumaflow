// ==========================================
// Workspace Tasks
// ==========================================

const WorkspaceTasks = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        container.innerHTML = `

            <div class="workspace-module">

                <div class="module-header">

                    <h2>Aufgaben</h2>

                    <button class="btn btn-primary">
                        + Aufgabe
                    </button>

                </div>

                <div class="card">

                    <p>
                        Hier erscheint später die komplette Aufgabenverwaltung
                        dieses Projekts.
                    </p>

                </div>

            </div>

        `;

    }

};
