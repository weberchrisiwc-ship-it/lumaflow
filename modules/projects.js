// ==============================
// LumaFlow - Projekte
// ==============================

let projects = JSON.parse(localStorage.getItem("lumaflow_projects")) || [];
// Alte Projekte automatisch aktualisieren

projects = projects.map(project => ({

    id: project.id || crypto.randomUUID(),

    number: project.number,

    name: project.name,

    customer: project.customer,

    status: project.status,

    tasks: project.tasks || [],

    meetings: project.meetings || [],

    protocols: project.protocols || [],

    contacts: project.contacts || []

}));
let editIndex = -1;

// ------------------------------
// Speicher
// ------------------------------

function saveProjects() {
    localStorage.setItem("lumaflow_projects", JSON.stringify(projects));
}

// ------------------------------
// Seite anzeigen
// ------------------------------

function showProjects() {

    setPage(`

<h1>📁 Projekte</h1>

<div style="display:flex;justify-content:space-between;align-items:center;margin:25px 0;">

    <input
        id="searchProject"
        type="text"
        placeholder="🔍 Projekt suchen..."
        onkeyup="renderProjects()"
        style="width:300px;padding:12px;border:1px solid #ccc;border-radius:8px;">

    <button class="btn btn-primary" onclick="openProjectModal()">
        + Neues Projekt
    </button>

</div>

<div class="card">

<table>

<thead>

<tr>

<th width="120">Nr.</th>
<th>Projekt</th>
<th>Kunde</th>
<th width="180">Status</th>
<th width="150">Aktion</th>

</tr>

</thead>

<tbody id="projectTable"></tbody>

</table>

</div>

<div class="modal" id="projectModal">

<div class="modal-content">

<h2 id="modalTitle">Neues Projekt</h2>

<input id="projectNumber" placeholder="Projektnummer">

<input id="projectName" placeholder="Projektname">

<input id="projectCustomer" placeholder="Kunde">

<select id="projectStatus">

<option>Planung</option>
<option>Ausschreibung</option>
<option>Ausführung</option>
<option>Abgeschlossen</option>

</select>

<div class="modal-buttons">

<button class="btn" onclick="closeProjectModal()">
Abbrechen
</button>

<button class="btn btn-primary" onclick="saveProject()">
Speichern
</button>

</div>

</div>

</div>

`);

    renderProjects();
}

// ------------------------------
// Tabelle
// ------------------------------

function renderProjects() {

    const table = document.getElementById("projectTable");

    const search =
        document.getElementById("searchProject").value.toLowerCase();

    table.innerHTML = "";

    let filtered = projects.filter(p =>
        p.number.toLowerCase().includes(search) ||
        p.name.toLowerCase().includes(search) ||
        p.customer.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5">
                Keine Projekte gefunden.
            </td>
        </tr>`;

        return;
    }

    filtered.forEach(project => {

        const index = projects.indexOf(project);

        table.innerHTML += `

<tr>

<td onclick="openProject(${index})" style="cursor:pointer;">
    ${project.number}
</td>

<td onclick="openProject(${index})" style="cursor:pointer;">
    ${project.name}
</td>

<td onclick="openProject(${index})" style="cursor:pointer;">
    ${project.customer}
</td>

<td onclick="openProject(${index})" style="cursor:pointer;">
    ${project.status}
</td>

<td>

<button class="btn" onclick="editProject(${index})">
✏️
</button>

<button class="btn btn-danger" onclick="deleteProject(${index})">
🗑️
</button>

</td>

</tr>

`;

    });

}

// ------------------------------
// Modal öffnen
// ------------------------------

function openProjectModal() {

    editIndex = -1;

    document.getElementById("modalTitle").innerHTML = "Neues Projekt";

    document.getElementById("projectNumber").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("projectCustomer").value = "";
    document.getElementById("projectStatus").value = "Planung";

    document.getElementById("projectModal").style.display = "flex";

}

// ------------------------------
// Bearbeiten
// ------------------------------

function editProject(index){

    editIndex=index;

    let p=projects[index];

    document.getElementById("modalTitle").innerHTML="Projekt bearbeiten";

    document.getElementById("projectNumber").value=p.number;
    document.getElementById("projectName").value=p.name;
    document.getElementById("projectCustomer").value=p.customer;
    document.getElementById("projectStatus").value=p.status;

    document.getElementById("projectModal").style.display="flex";

}

// ------------------------------
// Schließen
// ------------------------------

function closeProjectModal(){

    document.getElementById("projectModal").style.display="none";

}

// ------------------------------
// Speichern
// ------------------------------

function saveProject(){

const project = {

    id: editIndex === -1
        ? crypto.randomUUID()
        : projects[editIndex].id,

    number: document.getElementById("projectNumber").value,

    name: document.getElementById("projectName").value,

    customer: document.getElementById("projectCustomer").value,

    status: document.getElementById("projectStatus").value,

    tasks: editIndex === -1 ? [] : projects[editIndex].tasks || [],

    meetings: editIndex === -1 ? [] : projects[editIndex].meetings || [],

    protocols: editIndex === -1 ? [] : projects[editIndex].protocols || [],

    contacts: editIndex === -1 ? [] : projects[editIndex].contacts || []

};

    if(project.number==="" || project.name===""){

        alert("Bitte Projektnummer und Projektname eingeben.");

        return;

    }

    if(editIndex==-1){

        projects.push(project);

    }else{

        projects[editIndex]=project;

    }

    saveProjects();

    closeProjectModal();

    showProjects();

}

// ------------------------------
// Löschen
// ------------------------------

function deleteProject(index){

    if(!confirm("Projekt wirklich löschen?")) return;

    projects.splice(index,1);

    saveProjects();

    showProjects();

}
// ------------------------------
// Projekt öffnen
// ------------------------------

function openProject(index){

    const p = projects[index];

    setPage(`

<h1>📁 ${p.number} - ${p.name}</h1>

<br>

<div class="card">

<h2>Projektinformationen</h2>

<br>

<p><b>Kunde:</b> ${p.customer}</p>

<p><b>Status:</b> ${p.status}</p>

</div>

<div class="cards">

<div class="card">

<h3>✅ Aufgaben</h3>

<h1>${p.tasks.length}</h1>

<button class="btn btn-primary"
onclick="showTasksPage('${p.id}')">

Öffnen

</button>

</div>

<div class="card">

<h3>📅 Besprechungen</h3>

<h1>0</h1>

<button class="btn btn-primary"
onclick="showMeetingsPage('${p.id}')">

Öffnen

</button>

</div>

<div class="card">

<h3>📄 Protokolle</h3>

<h1>0</h1>

<button class="btn btn-primary">
Öffnen
</button>

</div>

<div class="card">

<h3>👥 Kontakte</h3>

<h1>0</h1>

<button class="btn btn-primary">
Öffnen
</button>

</div>

</div>

<br>

<button class="btn" onclick="showProjects()">

← Zur Projektübersicht

</button>

`);

}