// ==============================
// LumaFlow - Besprechungen
// ==============================

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

// --------------------------------

function renderMeetings(project){

    const list=document.getElementById("meetingList");

    list.innerHTML="";

    if(project.meetings.length==0){

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

<h2>

${meeting.title}

</h2>

<p>

📅 ${meeting.date}

</p>

<br>

<button class="btn btn-primary"

onclick="openMeeting('${project.id}',${index})">

Öffnen

</button>

</div>

`;

    });

}

// --------------------------------

function newMeeting(projectId){

    const project=projects.find(p=>p.id===projectId);

    const title=prompt("Titel der Besprechung");

    if(!title) return;

    project.meetings.push({

        title:title,

        date:new Date().toLocaleDateString(),

        notes:""

    });

    saveProjects();

    showMeetingsPage(projectId);

}

// --------------------------------

function openMeeting(projectId,index){

    const project=projects.find(p=>p.id===projectId);

    const meeting=project.meetings[index];

    setPage(`

<h1>${meeting.title}</h1>

<p>

${meeting.date}

</p>

<br>

<div class="card">

<textarea

id="meetingNotes"

style="width:100%;height:400px;border:none;font-size:16px;resize:none;outline:none;"

placeholder="Hier einfach mitschreiben...">${meeting.notes}</textarea>

</div>

<br>

<button class="btn btn-primary"

onclick="saveMeeting('${project.id}',${index})">

💾 Speichern

</button>

<button class="btn"

onclick="showMeetingsPage('${project.id}')">

Zurück

</button>

`);

}

// --------------------------------

function saveMeeting(projectId,index){

    const project=projects.find(p=>p.id===projectId);

    project.meetings[index].notes=document.getElementById("meetingNotes").value;

    saveProjects();

    alert("Besprechung gespeichert.");

}