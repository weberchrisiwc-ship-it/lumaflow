// =============================================
// LumaFlow
// Meetings
// =============================================

const MeetingModule = {

    open(projectId){

        const project = projects.find(p => p.id === projectId);

        if(!project) return;

        if(!project.meetings)
            project.meetings=[];

        const openMeetings =
            project.meetings.filter(m=>m.status!=="closed").length;

        const closedMeetings =
            project.meetings.filter(m=>m.status==="closed").length;

        let html = `

<h1>📅 Besprechungen</h1>

<h2>${project.number} - ${project.name}</h2>

<div class="cards">

<div class="card">

<h3>🟡 Offen</h3>

<h1>${openMeetings}</h1>

</div>

<div class="card">

<h3>🟢 Abgeschlossen</h3>

<h1>${closedMeetings}</h1>

</div>

<div class="card">

<h3>📅 Gesamt</h3>

<h1>${project.meetings.length}</h1>

</div>

</div>

<div style="display:flex;justify-content:space-between;margin:25px 0;">

<button
class="btn btn-primary"
onclick="MeetingModule.newMeeting('${project.id}')">

+ Neue Besprechung

</button>

<button
class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

</div>

`;

        if(project.meetings.length===0){

            html += `

<div class="card">

Noch keine Besprechungen vorhanden.

</div>

`;

        }else{

            project.meetings
                .sort((a,b)=>b.date.localeCompare(a.date))
                .forEach((meeting,index)=>{

                html += `

<div class="card">

<div style="display:flex;justify-content:space-between;align-items:center;">

<div>

<h2>${meeting.title}</h2>

<p>📅 ${meeting.date}</p>

<p>📍 ${meeting.location || "-"}</p>

<p>👥 ${(meeting.participants || []).length} Teilnehmer</p>

</div>

<div>

${
meeting.status==="closed"
?
'<span style="color:#16a34a;font-weight:bold;">🟢 Abgeschlossen</span>'
:
'<span style="color:#d97706;font-weight:bold;">🟡 Offen</span>'
}

</div>

</div>

<br>

<div style="display:flex;gap:10px;flex-wrap:wrap;">

<button
class="btn btn-primary"
onclick="MeetingModule.edit('${project.id}',${index})">

${meeting.status==="closed" ? "👁 Ansehen" : "✏️ Bearbeiten"}

</button>

<button
class="btn"
onclick="MeetingProtocol.previewMeeting('${project.id}',${index})">

📄 Protokoll

</button>

<button
class="btn btn-danger"
onclick="MeetingModule.remove('${project.id}',${index})">

🗑️ Löschen

</button>

</div>

</div>

`;

            });

        }

        setPage(html);

    },

    // ----------------------------

    newMeeting(projectId){

        MeetingEditor.open(projectId);

    },

    // ----------------------------

    edit(projectId,index){

        MeetingEditor.open(projectId,index);

    },

    // ----------------------------

    remove(projectId,index){

        if(!confirm("Besprechung wirklich löschen?"))
            return;

        const project =
            projects.find(p=>p.id===projectId);

        if(!project) return;

        project.meetings.splice(index,1);

        saveProjects();

        this.open(projectId);

    }

};

// =============================================
// Menüpunkt "Besprechungen"
// =============================================

function showMeetings(){

    let html = `

<h1>📅 Besprechungen</h1>

`;

    let found = false;

    projects.forEach(project=>{

        if((project.meetings || []).length===0)
            return;

        found = true;

        html += `

<div class="card">

<h2>${project.number} - ${project.name}</h2>

<p>

${project.meetings.length} Besprechungen

</p>

<br>

<button
class="btn btn-primary"
onclick="MeetingModule.open('${project.id}')">

Öffnen

</button>

</div>

`;

    });

    if(!found){

        html += `

<div class="card">

Noch keine Besprechungen vorhanden.

</div>

`;

    }

    setPage(html);

}
