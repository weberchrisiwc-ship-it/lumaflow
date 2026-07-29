// ==========================================
// LumaFlow
// Project Grid Component
// ==========================================

const ProjectGrid = {

    render(projects = []) {

        const container = document.getElementById("project-grid");

        if (!container) return;

        if (projects.length === 0) {

            container.innerHTML = `

                <div class="card">

                    <h2>📁 Keine Projekte vorhanden</h2>

                    <p>
                        Erstelle dein erstes Projekt über
                        <b>+ Neues Projekt</b>.
                    </p>

                </div>

            `;

            return;

        }

        container.innerHTML = `

            <div class="project-grid">

                ${projects
                    .map(project => ProjectCard.render(project))
                    .join("")}

            </div>

        `;

    }

};
