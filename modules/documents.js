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
// ---------------------------------
// Dateien hochladen
// ---------------------------------

function uploadDocuments(projectId){

    const project =
        projects.find(p=>p.id===projectId);

    const input =
        document.getElementById("documentUpload");

    if(input.files.length===0){

        alert("Bitte Datei auswählen.");

        return;

    }

    Array.from(input.files).forEach(file=>{

        project.documents.push({

            id: crypto.randomUUID(),

            name: file.name,

            size: formatFileSize(file.size),

            type: file.name.split(".").pop().toUpperCase(),

            date: new Date().toLocaleDateString("de-DE")

        });

    });

    saveProjects();

    showDocuments(projectId);

}

// ---------------------------------
// Dokument löschen
// ---------------------------------

function deleteDocument(projectId,index){

    if(!confirm("Dokument löschen?"))
        return;

    const project =
        projects.find(p=>p.id===projectId);

    project.documents.splice(index,1);

    saveProjects();

    showDocuments(projectId);

}

// ---------------------------------
// Dateigröße
// ---------------------------------

function formatFileSize(bytes){

    if(bytes<1024)
        return bytes+" B";

    if(bytes<1024*1024)
        return (bytes/1024).toFixed(1)+" KB";

    if(bytes<1024*1024*1024)
        return (bytes/1024/1024).toFixed(1)+" MB";

    return (bytes/1024/1024/1024).toFixed(1)+" GB";

}
