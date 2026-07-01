// =============================================
// LumaFlow
// Protokolle
// =============================================

function showProtocols(){

    let html = `

<h1>📝 Protokolle</h1>

`;

    let found = false;

    projects.forEach(project=>{

        (project.meetings || []).forEach((meeting,index)=>{

            if(meeting.status!=="closed")
                return;

            found = true;

            html += `

<div class="card">

<h2>${meeting.title}</h2>

<p>

📁 ${project.number} - ${project.name}

</p>

<p>

📅 ${meeting.date}

</p>

<div style="margin-top:20px;display:flex;gap:10px;">

<button
class="btn btn-primary"
onclick="MeetingProtocol.previewMeeting('${project.id}',${index})">

📄 Öffnen

</button>

<button
class="btn"
onclick="MeetingModule.edit('${project.id}',${index})">

👁 Ansehen

</button>

</div>

</div>

`;

        });

    });

    if(!found){

        html += `

<div class="card">

Noch keine abgeschlossenen Protokolle vorhanden.

</div>

`;

    }

    setPage(html);

}
