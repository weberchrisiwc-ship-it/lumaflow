// =====================================
// LumaFlow
// Meetings
// =====================================

function showMeetingsPage(projectId){

    const project = projects.find(p => p.id === projectId);

    if(!project.meetings)
        project.meetings=[];

    setPage(`

<h1>📅 Besprechungen</h1>

<h2>${project.number} - ${project.name}</h2>

<br>

<button class="btn btn-primary"
onclick="newMeeting('${project.id}')">

+ Neue Besprechung

</button>

<br><br>

<div id="meetingList"></div>

<br>

<button class="btn"
onclick="openProject(projects.findIndex(p=>p.id==='${project.id}'))">

← Zurück

</button>

`);

    renderMeetings(project);

}

// =====================================

function renderMeetings(project){

    const list=document.getElementById("meetingList");

    list.innerHTML="";

    if(project.meetings.length===0){

        list.innerHTML=`

<div class="card">

Noch keine Besprechungen vorhanden.

</div>

`;

        return;

    }

    project.meetings.forEach((meeting,index)=>{

        list.innerHTML+=`

<div class="card">

<h2>${meeting.title}</h2>

<p>📅 ${meeting.date}</p>

<p>📍 ${meeting.location || "-"}</p>

<br>

<button
class="btn btn-primary"
onclick="openMeeting('${project.id}',${index})">

Öffnen

</button>

</div>

`;

    });

}

// =====================================

function newMeeting(projectId){

    openMeetingEditor(projectId);

}

// =====================================

function openMeeting(projectId,index){

    openMeetingEditor(projectId,index);

}
