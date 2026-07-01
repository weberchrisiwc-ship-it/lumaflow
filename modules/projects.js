// ==============================
// LumaFlow - Projekte
// Version 2.0
// Teil 1 / 2
// ==============================

let projects = JSON.parse(
    localStorage.getItem("lumaflow_projects")
) || [];

projects = projects.map(project => ({

    id: project.id || crypto.randomUUID(),

    number: project.number || "",

    name: project.name || "",

    customer: project.customer || "",

    status: project.status || "Planung",

    tasks: project.tasks || [],

    meetings: project.meetings || [],

    protocols: project.protocols || [],

    contacts: project.contacts || [],

    documents: project.documents || [],

    created: project.created || new Date().toISOString()

}));

let editIndex = -1;

// ---------------------------------

function saveProjects(){

    localStorage.setItem(

        "lumaflow_projects",

        JSON.stringify(projects)

    );

}

// ---------------------------------

function showProjects(){

    setPage(`

<h1>📁 Projekte</h1>

<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin:25px 0;">

<input

id="searchProject"

type="text"

placeholder="🔍 Projekt suchen..."

onkeyup="renderProjects()"

style="width:320px;">

<button

class="btn btn-primary"

onclick="openProjectModal()">

+ Neues Projekt

</button>

</div>

<div id="projectCards"

class="cards">

</div>

<div class="modal" id="projectModal">

<div class="modal-content">

<h2 id="modalTitle">

Neues Projekt

</h2>

<input
id="projectNumber"
placeholder="Projektnummer">

<input
id="projectName"
placeholder="Projektname">

<input
id="projectCustomer"
placeholder="Kunde">

<select id="projectStatus">

<option>Planung</option>

<option>Ausschreibung</option>

<option>Ausführung</option>

<option>Abnahme</option>

<option>Abgeschlossen</option>

</select>

<div class="modal-buttons">

<button

class="btn"

onclick="closeProjectModal()">

Abbrechen

</button>

<button

class="btn btn-primary"

onclick="saveProject()">

Speichern

</button>

</div>

</div>

</div>

`);

    renderProjects();

}

// ---------------------------------

function renderProjects(){

    const container =
        document.getElementById("projectCards");

    container.innerHTML="";

    const search =
        document
        .getElementById("searchProject")
        .value
        .toLowerCase();

    const filtered = projects.filter(project=>

        project.number.toLowerCase().includes(search) ||

        project.name.toLowerCase().includes(search) ||

        project.customer.toLowerCase().includes(search)

    );

    if(filtered.length===0){

        container.innerHTML=`

<div class="card">

<h2>

Keine Projekte vorhanden.

</h2>

</div>

`;

        return;

    }

    filtered.forEach(project=>{

        const index =
            projects.indexOf(project);

        const totalTasks =
            project.tasks.length;

        const openTasks =
            project.tasks.filter(t=>

                t.status!=="Erledigt"

            ).length;

        const progress =
            totalTasks===0
                ?0
                :Math.round(

                    ((totalTasks-openTasks)/totalTasks)*100

                );

        container.innerHTML += `

<div class="card">

<div style="
display:flex;
justify-content:space-between;
align-items:center;">

<div>

<h2>

📁 ${project.number}

</h2>

<p>

${project.name}

</p>

</div>

<div>

${project.status}

</div>

</div>

<br>

<b>Kunde</b>

<br>

${project.customer}

<br><br>

<div style="
height:10px;
background:#e8edf5;
border-radius:10px;
overflow:hidden;">

<div style="
height:10px;
width:${progress}%;
background:#2450d3;">

</div>

</div>

<p style="margin-top:8px;">

Projektfortschritt

<b>

${progress}%

</b>

</p>

<br>

<div class="cards"
style="grid-template-columns:repeat(2,1fr);gap:12px;">

<div>

🔥 ${openTasks}

<br>

Offene Aufgaben

</div>

<div>

📅 ${project.meetings.length}

<br>

Besprechungen

</div>

<div>

📄 ${project.protocols.length}

<br>

Protokolle

</div>

<div>

👥 ${project.contacts.length}

<br>

Kontakte

</div>

</div>

<br>

<div style="
display:flex;
gap:10px;">

<button

class="btn btn-primary"

style="flex:1;"

onclick="openProject(${index})">

Projekt öffnen

</button>

<button

class="btn"

onclick="editProject(${index})">

✏️

</button>

<button

class="btn btn-danger"

onclick="deleteProject(${index})">

🗑️

</button>

</div>

</div>

`;

    });

}
// ---------------------------------
// Projekt öffnen
// ---------------------------------

function openProject(index){

    const p = projects[index];

    const totalTasks = p.tasks.length;

    const openTasks =
        p.tasks.filter(t=>t.status!=="Erledigt").length;

    const progress =
        totalTasks===0
            ?0
            :Math.round(((totalTasks-openTasks)/totalTasks)*100);

    const nextMeeting =
        (p.meetings || [])
        .sort((a,b)=>a.date.localeCompare(b.date))[0];

    setPage(`

<h1>📁 ${p.number} - ${p.name}</h1>

<div class="cards">

<div class="card">

<h2>📊 Projektstatus</h2>

<p>

<b>Status:</b> ${p.status}

</p>

<p>

<b>Kunde:</b> ${p.customer}

</p>

<br>

<div style="
height:12px;
background:#eceff5;
border-radius:12px;
overflow:hidden;">

<div style="
width:${progress}%;
height:12px;
background:#2450d3;">

</div>

</div>

<p style="margin-top:10px;">

Fortschritt

<b>${progress}%</b>

</p>

</div>

<div class="card">

<h2>📅 Nächste Besprechung</h2>

${
nextMeeting
?

`

<b>${nextMeeting.title}</b>

<br><br>

${nextMeeting.date}

`

:

`

Keine Besprechung geplant.

`

}

</div>

<div class="card">

<h2>🔥 Aufgaben</h2>

<h1>${openTasks}</h1>

<p>

offen von ${totalTasks}

</p>

</div>

</div>

<div class="cards">

<div class="card">

<h2>📅 Besprechungen</h2>

<h1>${p.meetings.length}</h1>

<button
class="btn btn-primary"
onclick="MeetingModule.open('${p.id}')">

Öffnen

</button>

</div>

<div class="card">

<h2>✅ Aufgaben</h2>

<h1>${p.tasks.length}</h1>

<button
class="btn btn-primary"
onclick="showTasksPage('${p.id}')">

Öffnen

</button>

</div>

<div class="card">

<h2>📄 Protokolle</h2>

<h1>${p.protocols.length}</h1>

<button
class="btn">

Öffnen

</button>

</div>

<div class="card">

<h2>👥 Kontakte</h2>

<h1>${p.contacts.length}</h1>

<button
class="btn">

Öffnen

</button>

</div>

</div>

<div class="card">

<h2>📈 Projektübersicht</h2>

<table>

<tr>

<td>Aufgaben gesamt</td>

<td>${totalTasks}</td>

</tr>

<tr>

<td>Offene Aufgaben</td>

<td>${openTasks}</td>

</tr>

<tr>

<td>Besprechungen</td>

<td>${p.meetings.length}</td>

</tr>

<tr>

<td>Protokolle</td>

<td>${p.protocols.length}</td>

</tr>

<tr>

<td>Kontakte</td>

<td>${p.contacts.length}</td>

</tr>

<tr>

<td>Dokumente</td>

<td>${p.documents.length}</td>

</tr>

</table>

</div>

<br>

<button
class="btn"
onclick="showProjects()">

← Zur Projektübersicht

</button>

`);

}

// ---------------------------------
// Modal
// ---------------------------------

function openProjectModal(){

    editIndex=-1;

    document.getElementById("modalTitle").innerHTML="Neues Projekt";

    document.getElementById("projectNumber").value="";
    document.getElementById("projectName").value="";
    document.getElementById("projectCustomer").value="";
    document.getElementById("projectStatus").value="Planung";

    document.getElementById("projectModal").style.display="flex";

}

function closeProjectModal(){

    document.getElementById("projectModal").style.display="none";

}

// ---------------------------------
// Bearbeiten
// ---------------------------------

function editProject(index){

    editIndex=index;

    const p=projects[index];

    document.getElementById("modalTitle").innerHTML="Projekt bearbeiten";

    document.getElementById("projectNumber").value=p.number;
    document.getElementById("projectName").value=p.name;
    document.getElementById("projectCustomer").value=p.customer;
    document.getElementById("projectStatus").value=p.status;

    document.getElementById("projectModal").style.display="flex";

}

// ---------------------------------
// Speichern
// ---------------------------------

function saveProject(){

    const project={

        id:editIndex===-1
            ?crypto.randomUUID()
            :projects[editIndex].id,

        number:document.getElementById("projectNumber").value,

        name:document.getElementById("projectName").value,

        customer:document.getElementById("projectCustomer").value,

        status:document.getElementById("projectStatus").value,

        tasks:editIndex===-1?[]:projects[editIndex].tasks,

        meetings:editIndex===-1?[]:projects[editIndex].meetings,

        protocols:editIndex===-1?[]:projects[editIndex].protocols,

        contacts:editIndex===-1?[]:projects[editIndex].contacts,

        documents:editIndex===-1?[]:(projects[editIndex].documents||[]),

        created:editIndex===-1
            ?new Date().toISOString()
            :projects[editIndex].created

    };

    if(project.number==="" || project.name===""){

        alert("Bitte Projektnummer und Projektname eingeben.");

        return;

    }

    if(editIndex===-1){

        projects.push(project);

    }else{

        projects[editIndex]=project;

    }

    saveProjects();

    closeProjectModal();

    showProjects();

}

// ---------------------------------
// Löschen
// ---------------------------------

function deleteProject(index){

    if(!confirm("Projekt wirklich löschen?"))
        return;

    projects.splice(index,1);

    saveProjects();

    showProjects();

}
