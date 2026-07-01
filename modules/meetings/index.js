// =============================================
// LumaFlow
// Meetings - Übersicht
// Version 1.0
// =============================================

const MeetingModule = {

    open(projectId) {

        const project = projects.find(p => p.id === projectId);

        if (!project.meetings)
            project.meetings = [];

        let html = `

<h1>📅 Besprechungen</h1>

<h2>${project.number} - ${project.name}</h2>

<div class="toolbar">

<button class="btn btn-primary"
onclick="MeetingModule.newMeeting('${project.id}')">

+ Neue Besprechung

</button>

<button class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

</div>

`;

        if (project.meetings.length === 0) {

            html += `

<div class="card">

<h3>Noch keine Besprechungen vorhanden.</h3>

<p>Erstelle deine erste Besprechung.</p>

</div>

`;

        } else {

            project.meetings.forEach((meeting,index)=>{

                html += `

<div class="card meeting-card">

<h2>${meeting.title}</h2>

<p>📅 ${meeting.date}</p>

<p>📍 ${meeting.location || "-"}</p>

<p>

${meeting.status==="closed"

? "🟢 Abgeschlossen"

: "🟡 Offen"}

</p>

<div style="margin-top:20px;">

<button
class="btn btn-primary"
onclick="MeetingModule.edit('${project.id}',${index})">

Öffnen

</button>

<button
class="btn btn-danger"
onclick="MeetingModule.remove('${project.id}',${index})">

Löschen

</button>

</div>

</div>

`;

            });

        }

        setPage(html);

    },

    newMeeting(projectId){

        MeetingEditor.open(projectId);

    },

    edit(projectId,index){

        MeetingEditor.open(projectId,index);

    },

    remove(projectId,index){

        if(!confirm("Besprechung löschen?"))
            return;

        const project = projects.find(p=>p.id===projectId);

        project.meetings.splice(index,1);

        saveProjects();

        this.open(projectId);

    }

};
