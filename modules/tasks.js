// =============================================
// LumaFlow
// Aufgaben 2.0
// Kanban Board
// =============================================

function showTasksPage(projectId){

    const project = projects.find(p=>p.id===projectId);

    if(!project.tasks)
        project.tasks=[];

    setPage(`

<h1>✅ Aufgaben</h1>

<h2>${project.number} - ${project.name}</h2>

<br>

<button
class="btn btn-primary"
onclick="openTaskModal()">

+ Aufgabe

</button>

<br><br>

<div class="cards" style="grid-template-columns:repeat(3,1fr);">

<div class="card">

<h2>📌 Offen</h2>

<div id="taskOpen"></div>

</div>

<div class="card">

<h2>🚧 In Bearbeitung</h2>

<div id="taskProgress"></div>

</div>

<div class="card">

<h2>✅ Erledigt</h2>

<div id="taskDone"></div>

</div>

</div>

<div class="modal" id="taskModal">

<div class="modal-content">

<h2>Neue Aufgabe</h2>

<input
id="taskTitle"
placeholder="Titel">

<textarea

id="taskDescription"

placeholder="Beschreibung"

style="width:100%;height:90px;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:8px;">

</textarea>

<select id="taskPerson"></select>

<input
type="date"
id="taskDate">

<select id="taskPriority">

<option>Niedrig</option>

<option selected>Mittel</option>

<option>Hoch</option>

</select>

<select id="taskStatus">

<option selected>Offen</option>

<option>In Bearbeitung</option>

<option>Erledigt</option>

</select>

<div class="modal-buttons">

<button
class="btn"
onclick="closeTaskModal()">

Abbrechen

</button>

<button
class="btn btn-primary"
onclick="saveTask('${project.id}')">

Speichern

</button>

</div>

</div>

</div>

<br>

<button
class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

`);

    loadPersons();

    renderKanban(project);

}

// =============================================

function renderKanban(project){

    const open=document.getElementById("taskOpen");
    const progress=document.getElementById("taskProgress");
    const done=document.getElementById("taskDone");

    open.innerHTML="";
    progress.innerHTML="";
    done.innerHTML="";

    project.tasks.forEach((task,index)=>{

        const card=`

<div class="card" style="margin-bottom:15px;">

<b>${task.title}</b>

<br><br>

👤 ${task.person || "-"}

<br>

📅 ${task.date || "-"}

<br>

⚡ ${task.priority}

<br><br>

<select
style="width:100%;"
onchange="updateTaskStatus('${project.id}',${index},this.value)">

<option value="Offen"
${task.status==="Offen"?"selected":""}>

Offen

</option>

<option value="In Bearbeitung"
${task.status==="In Bearbeitung"?"selected":""}>

In Bearbeitung

</option>

<option value="Erledigt"
${task.status==="Erledigt"?"selected":""}>

Erledigt

</option>

</select>

<br><br>

<button
class="btn btn-danger"
style="width:100%;"
onclick="deleteTask('${project.id}',${index})">

🗑️ Löschen

</button>

</div>

`;

        if(task.status==="Offen")

            open.innerHTML+=card;

        else if(task.status==="In Bearbeitung")

            progress.innerHTML+=card;

        else

            done.innerHTML+=card;

    });

}
// =============================================
// Personen laden
// =============================================

function loadPersons(){

    const select=document.getElementById("taskPerson");

    select.innerHTML="";

    contacts.forEach(person=>{

        select.innerHTML+=`

<option value="${person.name}">

${person.name}

</option>

`;

    });

}

// =============================================

function openTaskModal(){

    document.getElementById("taskModal").style.display="flex";

}

function closeTaskModal(){

    document.getElementById("taskModal").style.display="none";

}

// =============================================

function saveTask(projectId){

    const project=projects.find(p=>p.id===projectId);

    project.tasks.push({

        id:crypto.randomUUID(),

        title:document.getElementById("taskTitle").value,

        description:document.getElementById("taskDescription").value,

        person:document.getElementById("taskPerson").value,

        assigned:document.getElementById("taskPerson").value,

        date:document.getElementById("taskDate").value,

        due:document.getElementById("taskDate").value,

        priority:document.getElementById("taskPriority").value,

        status:document.getElementById("taskStatus").value,

        created:new Date().toISOString()

    });

    saveProjects();

    showTasksPage(projectId);

}

// =============================================

function updateTaskStatus(projectId,index,status){

    const project=projects.find(p=>p.id===projectId);

    project.tasks[index].status=status;

    saveProjects();

    renderKanban(project);

}

// =============================================

function deleteTask(projectId,index){

    if(!confirm("Aufgabe löschen?"))
        return;

    const project=projects.find(p=>p.id===projectId);

    project.tasks.splice(index,1);

    saveProjects();

    renderKanban(project);

}

// =============================================
// Globale Aufgabenübersicht
// =============================================

function showTasks(){

    setPage(`

<h1>✅ Alle Aufgaben</h1>

<div class="cards" id="allTaskCards"></div>

`);

    const container=document.getElementById("allTaskCards");

    projects.forEach(project=>{

        const open=
            project.tasks.filter(t=>t.status!=="Erledigt").length;

        container.innerHTML+=`

<div class="card">

<h2>${project.number}</h2>

<b>${project.name}</b>

<br><br>

🔥 ${open} offene Aufgaben

<br><br>

<button
class="btn btn-primary"
onclick="showTasksPage('${project.id}')">

Projekt öffnen

</button>

</div>

`;

    });

}
