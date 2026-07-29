// ==========================================
// LumaFlow
// Project Page Component
// ==========================================

const ProjectPage = {

    render(projects = []) {

        const container = document.getElementById("projects-page");

        if (!container) return;

        container.innerHTML = `

            <h1>📁 Projekte</h1>

            <div id="project-toolbar"></div>

            <div id="project-grid"></div>

            <div id="project-dialog"></div>

        `;

        ProjectToolbar.render();

        ProjectGrid.render(projects);

    },

    refresh(projects = []) {

        ProjectGrid.render(projects);

    }

};
