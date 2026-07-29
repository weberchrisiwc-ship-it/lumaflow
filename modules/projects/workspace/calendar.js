// ==========================================
// Workspace Calendar
// ==========================================

const WorkspaceCalendar = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        container.innerHTML = `

            <div class="workspace-module">

                <h2>Projektkalender</h2>

                <div class="card">

                    <p>
                        Hier wird später der Projektkalender eingebunden.
                    </p>

                </div>

            </div>

        `;

    }

};
