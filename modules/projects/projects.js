// ==========================================
// LumaFlow
// Projects Module Controller
// ==========================================

let projects = [];
let currentProject = null;
let editIndex = -1;

// ==========================================
// Initialisierung
// ==========================================

function initProjects() {

    ProjectService.init();

    projects = ProjectService.getAll();

}

// ==========================================
// Projekte anzeigen
// ==========================================

function showProjects() {

    initProjects();

    setPage(`

        <div id="projects-page"></div>

    `);

    ProjectPage.render(projects);

}

// ==========================================
// Projekte aktualisieren
// ==========================================

function refreshProjects() {

    projects = ProjectService.getAll();

    ProjectPage.render(projects);

}

// ==========================================
// Projekt öffnen
// ==========================================

function openProject(projectId) {

    ProjectWorkspace.open(projectId);

}

// ==========================================
// Neues Projekt
// ==========================================

function createProject() {

    ProjectDialog.open();

}

// ==========================================
// Projekt speichern
// ==========================================

function saveProject(projectData) {

    if (editIndex === -1) {

        ProjectService.create(projectData);

    } else {

        ProjectService.update(projectData);

    }

    ProjectDialog.close();

    refreshProjects();

}

// ==========================================
// Projekt bearbeiten
// ==========================================

function editProject(projectId) {

    const project = ProjectService.getById(projectId);

    if (!project) return;

    editIndex = projects.findIndex(p => p.id === projectId);

    ProjectDialog.open(project);

}

// ==========================================
// Projekt löschen
// ==========================================

function deleteProject(projectId) {

    if (!confirm("Projekt wirklich löschen?")) {

        return;

    }

    ProjectService.delete(projectId);

    refreshProjects();

}

// ==========================================
// Suche
// ==========================================

function searchProjects(searchText) {

    const filtered = ProjectService.search(searchText);

    ProjectPage.render(filtered);

}
