// ==========================================
// LumaFlow
// Project Card Component
// ==========================================

const ProjectCard = {

    render(project) {

        const totalTasks = project.tasks.length;

        const openTasks = project.tasks.filter(task =>
            task.status !== "Erledigt"
        ).length;

        const progress = totalTasks === 0
            ? 0
            : Math.round(((totalTasks - openTasks) / totalTasks) * 100);

        return `

            <div class="card project-card">

                <div class="project-card-header">

                    <div>

                        <h2>📁 ${project.number}</h2>

                        <p>${project.name}</p>

                    </div>

                    <span class="project-status">

                        ${project.status}

                    </span>

                </div>

                <div class="project-card-body">

                    <p>

                        <strong>Kunde</strong>

                    </p>

                    <p>${project.customer}</p>

                </div>

                <div class="project-progress">

                    <div class="project-progress-bar">

                        <div
                            class="project-progress-fill"
                            style="width:${progress}%">

                        </div>

                    </div>

                    <p>

                        Projektfortschritt

                        <strong>${progress}%</strong>

                    </p>

                </div>

                <div class="project-card-stats">

                    <div>

                        🔥

                        <strong>${openTasks}</strong>

                        <span>Offene Aufgaben</span>

                    </div>

                    <div>

                        📅

                        <strong>${project.meetings.length}</strong>

                        <span>Besprechungen</span>

                    </div>

                    <div>

                        📄

                        <strong>${project.protocols.length}</strong>

                        <span>Protokolle</span>

                    </div>

                    <div>

                        👥

                        <strong>${project.contacts.length}</strong>

                        <span>Kontakte</span>

                    </div>

                </div>

                <div class="project-card-actions">

                    <button
                        class="btn btn-primary"
                        onclick="openProject('${project.id}')">

                        Projekt öffnen

                    </button>

                    <button
                        class="btn"
                        onclick="editProject('${project.id}')">

                        ✏️

                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteProject('${project.id}')">

                        🗑️

                    </button>

                </div>

            </div>

        `;

    }

};
