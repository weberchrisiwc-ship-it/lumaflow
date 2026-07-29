// ==========================================
// Workspace Header
// ==========================================

const WorkspaceHeader = {

    render(project) {

        const container = document.getElementById("workspace-header");

        if (!container) return;

        container.innerHTML = `

            <div class="workspace-header">

                <div>

                    <h1>${project.number}</h1>

                    <h2>${project.name}</h2>

                    <p>${project.customer}</p>

                </div>

                <div class="workspace-header-actions">

                    <span class="badge">

                        ${project.status}

                    </span>

                    <button
                        class="btn"
                        onclick="editProject('${project.id}')">

                        Bearbeiten

                    </button>

                </div>

            </div>

        `;

    }

};
