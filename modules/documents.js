// ==============================
// LumaFlow - Dokumente
// ==============================

function showDocuments(projectId){

    const project = projects.find(p=>p.id===projectId);

    if(!project.documents)
        project.documents=[];

    setPage(`

<h1>📎 Dokumente</h1>

<h2>${project.number} - ${project.name}</h2>

<br>

<div class="card">

<input
type="file"
id="documentUpload"
multiple>

<br><br>

<button
class="btn btn-primary"
onclick="uploadDocuments('${project.id}')">

Dateien hinzufügen

</button>

</div>

<div class="card">

<table>

<thead>

<tr>

<th>Datei</th>

<th>Größe</th>

<th>Typ</th>

<th width="120"></th>

</tr>

</thead>

<tbody id="documentTable"></tbody>

</table>

</div>

<br>

<button
class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

`);

    renderDocuments(project);

}

function renderDocuments(project){

    const table=document.getElementById("documentTable");

    table.innerHTML="";

    if(project.documents.length===0){

        table.innerHTML=`

<tr>

<td colspan="4">

Noch keine Dokumente vorhanden.

</td>

</tr>

`;

        return;

    }

    project.documents.forEach((doc,index)=>{

        table.innerHTML+=`

<tr>

<td>${doc.name}</td>

<td>${doc.size}</td>

<td>${doc.type}</td>

<td>

<button
class="btn btn-danger"
onclick="deleteDocument('${project.id}',${index})">

🗑️

</button>

</td>

</tr>

`;

    });

}
