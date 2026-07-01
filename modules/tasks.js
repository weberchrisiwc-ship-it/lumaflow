function showTasksPage(projectId){

    const project = projects.find(p => p.id === projectId);
if (!project.tasks) {
    project.tasks = [];
}
    setPage(`

<h1>✅ Aufgaben</h1>

<h2>${project.number} - ${project.name}</h2>

<br>

<button class="btn btn-primary" onclick="openTaskModal('${project.id}')">

+ Aufgabe

</button>

<br><br>

<div class="card">

<table>

<thead>

<tr>

<th>Titel</th>
<th>Verantwortlich</th>
<th>Fällig</th>
<th>Priorität</th>
<th>Status</th>
<th></th>

</tr>

</thead>

<tbody id="taskTable"></tbody>

</table>

</div>

<div class="modal" id="taskModal">

<div class="modal-content">

<h2>Neue Aufgabe</h2>

<input id="taskTitle" placeholder="Titel">

<textarea id="taskDescription"
placeholder="Beschreibung"
style="width:100%;height:90px;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:8px;"></textarea>

<select id="taskPerson"></select>

<input type="date" id="taskDate">

<select id="taskPriority">

<option>Niedrig</option>
<option>Mittel</option>
<option>Hoch</option>

</select>

<select id="taskStatus">

<option>Offen</option>
<option>In Bearbeitung</option>
<option>Erledigt</option>

</select>

<div class="modal-buttons">

<button class="btn" onclick="closeTaskModal()">
Abbrechen
</button>

<button class="btn btn-primary" onclick="saveTask('${project.id}')">
Speichern
</button>

</div>

</div>

</div>

<br>

<button class="btn" onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

`);

    loadPersons();

    renderTasks(project);

}

// --------------------------

function loadPersons(){

    const select=document.getElementById("taskPerson");

    select.innerHTML="";

    contacts.forEach(person=>{

        select.innerHTML+=`

<option>

${person.name}

</option>

`;

    });

}

// --------------------------

function renderTasks(project){

    const table=document.getElementById("taskTable");

    table.innerHTML="";

    if(project.tasks.length===0){

        table.innerHTML=`
<tr>
<td colspan="6">
Noch keine Aufgaben vorhanden.
</td>
</tr>
`;

        return;

    }

    project.tasks.forEach((task,index)=>{

        table.innerHTML+=`

<tr>

<td>${task.title}</td>

<td>${task.person}</td>

<td>${task.date}</td>

<td>${task.priority}</td>

<td>${task.status}</td>

<td>

<button class="btn btn-danger"

onclick="deleteTask('${project.id}',${index})">

🗑️

</button>

</td>

</tr>

`;

    });

}

// --------------------------

function openTaskModal(){

document.getElementById("taskModal").style.display="flex";

}

function closeTaskModal(){

document.getElementById("taskModal").style.display="none";

}

// --------------------------

function saveTask(projectId){

const project=projects.find(p=>p.id===projectId);

project.tasks.push({

title:document.getElementById("taskTitle").value,

description:document.getElementById("taskDescription").value,

person:document.getElementById("taskPerson").value,

date:document.getElementById("taskDate").value,

priority:document.getElementById("taskPriority").value,

status:document.getElementById("taskStatus").value

});

saveProjects();

showTasksPage(projectId);

}

// --------------------------

function deleteTask(projectId,index){

const project=projects.find(p=>p.id===projectId);

project.tasks.splice(index,1);

saveProjects();

showTasksPage(projectId);

}
