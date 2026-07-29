// ==========================================
// LumaFlow
// Project Page Component
// ==========================================

const ProjectPage = {

    render(projects = []) {

        const container = document.getElementById("projects-page");

        if (!container) return;

container.innerHTML = `

    ${ProjectHeader.render()}

    ${ProjectStatistics.render(projects)}

    <div id="project-toolbar"></div>

    <div id="project-grid"></div>

`;

        ProjectToolbar.render();

        ProjectGrid.render(projects);

    },

    refresh(projects = []) {

        ProjectGrid.render(projects);

    }

};
