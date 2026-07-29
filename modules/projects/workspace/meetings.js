// ==========================================
// Workspace Meetings
// ==========================================

const WorkspaceMeetings = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        container.innerHTML = `

            <div class="workspace-module">

                <div class="module-header">

                    <h2>Meetings</h2>

                    <button class="btn btn-primary">
                        + Meeting
                    </button>

                </div>

                <div class="card">

                    <p>
                        Alle projektbezogenen Meetings werden hier angezeigt.
                    </p>

                </div>

            </div>

        `;

    }

};
