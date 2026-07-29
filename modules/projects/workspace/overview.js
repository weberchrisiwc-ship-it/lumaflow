// ==========================================
// Workspace Overview
// ==========================================

const WorkspaceOverview = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        const totalTasks = project.tasks?.length || 0;

        const completedTasks = (project.tasks || []).filter(task =>
            task.status === "Erledigt"
        ).length;

        const progress = totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        container.innerHTML = `

            <div class="workspace-overview">

                <div class="workspace-stats">

                    <div class="card stat-card">
                        <h3>Aufgaben</h3>
                        <span>${totalTasks}</span>
                    </div>

                    <div class="card stat-card">
                        <h3>Meetings</h3>
                        <span>${project.meetings?.length || 0}</span>
                    </div>

                    <div class="card stat-card">
                        <h3>Dokumente</h3>
                        <span>${project.documents?.length || 0}</span>
                    </div>

                    <div class="card stat-card">
                        <h3>Kontakte</h3>
                        <span>${project.contacts?.length || 0}</span>
                    </div>

                </div>

                <div class="card">

                    <h2>Projektfortschritt</h2>

                    <div class="progress">

                        <div
                            class="progress-fill"
                            style="width:${progress}%">

                        </div>

                    </div>

                    <p>${progress}% abgeschlossen</p>

                </div>

                <div class="card">

                    <h2>Projektinformationen</h2>

                    <table class="project-info-table">

                        <tr>
                            <td>Projekt-Nr.</td>
                            <td>${project.number}</td>
                        </tr>

                        <tr>
                            <td>Name</td>
                            <td>${project.name}</td>
                        </tr>

                        <tr>
                            <td>Kunde</td>
                            <td>${project.customer}</td>
                        </tr>

                        <tr>
                            <td>Status</td>
                            <td>${project.status}</td>
                        </tr>

                    </table>

                </div>

            </div>

        `;

    }

};
