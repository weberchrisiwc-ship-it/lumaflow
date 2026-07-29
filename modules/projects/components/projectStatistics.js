// ==========================================
// LumaFlow
// Project Statistics
// ==========================================

const ProjectStatistics = {

    render(projects = []) {

        const total = projects.length;

        const active = projects.filter(p => p.status === "Aktiv").length;

        const completed = projects.filter(p => p.status === "Abgeschlossen").length;

        const paused = projects.filter(p => p.status === "Pausiert").length;

        return `

            <div class="project-statistics">

                <div class="card stat-card">

                    <h3>${total}</h3>

                    <span>Projekte</span>

                </div>

                <div class="card stat-card">

                    <h3>${active}</h3>

                    <span>Aktiv</span>

                </div>

                <div class="card stat-card">

                    <h3>${completed}</h3>

                    <span>Abgeschlossen</span>

                </div>

                <div class="card stat-card">

                    <h3>${paused}</h3>

                    <span>Pausiert</span>

                </div>

            </div>

        `;

    }

};
