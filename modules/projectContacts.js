// =============================================
// LumaFlow
// Projektkontakte
// =============================================

function showProjectContacts(projectId){

    const project =
        projects.find(p=>p.id===projectId);

    if(!project.contacts)
        project.contacts=[];

    setPage(`

<h1>👥 Projektkontakte</h1>

<h2>${project.number} - ${project.name}</h2>

<br>

<div class="card">

<h3>Kontakte hinzufügen</h3>

<div id="availableContacts"></div>

</div>

<div class="card">

<h3>Projektteam</h3>

<table>

<thead>

<tr>

<th>Name</th>

<th width="120"></th>

</tr>

</thead>

<tbody id="projectContactTable"></tbody>

</table>

</div>

<br>

<button
class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

`);

    renderAvailableContacts(project);

    renderProjectContacts(project);

}

// =============================================

function renderAvailableContacts(project){

    const container =
        document.getElementById("availableContacts");

    container.innerHTML="";

    contacts.forEach(person=>{

        if(project.contacts.some(c=>c.id===person.id))
            return;

        container.innerHTML+=`

<button

class="btn btn-primary"

style="margin:5px;"

onclick="addProjectContact('${project.id}','${person.id}')">

${person.name}

</button>

`;

    });

}

// =============================================

function renderProjectContacts(project){

    const table =
        document.getElementById("projectContactTable");

    table.innerHTML="";

    if(project.contacts.length===0){

        table.innerHTML=`

<tr>

<td colspan="2">

Noch keine Kontakte.

</td>

</tr>

`;

        return;

    }

    project.contacts.forEach((person,index)=>{

        table.innerHTML+=`

<tr>

<td>${person.name}</td>

<td>

<button
class="btn btn-danger"
onclick="removeProjectContact('${project.id}',${index})">

🗑️

</button>

</td>

</tr>

`;

    });

}
// =============================================
// Kontakt hinzufügen
// =============================================

function addProjectContact(projectId,contactId){

    const project =
        projects.find(p=>p.id===projectId);

    const person =
        contacts.find(c=>c.id===contactId);

    if(!project || !person)
        return;

    project.contacts.push({

        id:person.id,

        name:person.name

    });

    saveProjects();

    showProjectContacts(projectId);

}

// =============================================
// Kontakt entfernen
// =============================================

function removeProjectContact(projectId,index){

    if(!confirm("Kontakt entfernen?"))
        return;

    const project =
        projects.find(p=>p.id===projectId);

    project.contacts.splice(index,1);

    saveProjects();

    showProjectContacts(projectId);

}
