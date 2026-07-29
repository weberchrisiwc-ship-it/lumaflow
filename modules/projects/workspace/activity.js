// ==========================================
// Workspace Activity
// ==========================================

const WorkspaceActivity = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        const activity = project.activity || [];

        container.innerHTML = `

            <div class="workspace-module">

                <h2>Projektaktivitäten</h2>

                ${
                    activity.length === 0

                    ?

                    `
                        <div class="card empty-state">

                            <h3>Noch keine Aktivitäten</h3>

                        </div>
                    `

                    :

                    `
                        <div class="card">

                            ${activity.map(item => `

                                <div class="timeline-item">

                                    <strong>${item.date}</strong>

                                    <p>${item.text}</p>

                                </div>

                            `).join("")}

                        </div>
                    `

                }

            </div>

        `;

    }

};
