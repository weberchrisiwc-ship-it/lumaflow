// ==========================================
// LumaFlow
// Projects Module Controller
// ==========================================

let projects = [];
let currentProject = null;

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

function saveProject(data) {

    if (data.id) {

        ProjectService.update(data.id, data);

    } else {

        ProjectService.create(data);

    }

    ProjectDialog.close();

    refreshProjects();

}

// ==========================================
// Projekt bearbeiten
// ==========================================

function editProject(projectId) {

    const project = ProjectService.getById(projectId);

    if (!project) {

        return;

    }

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
