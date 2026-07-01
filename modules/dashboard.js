// =============================================
// LumaFlow Dashboard
// Version 2.0
// =============================================

function showDashboard(){

    let totalTasks = 0;
    let openTasks = 0;
    let meetings = 0;
    let protocols = 0;

    projects.forEach(project=>{

        if(project.tasks){

            totalTasks += project.tasks.length;

            openTasks += project.tasks.filter(task=>

                task.status !== "Erledigt"

            ).length;

        }

        if(project.meetings){

            meetings += project.meetings.length;

            protocols += project.meetings.filter(m=>

                m.status==="closed"

            ).length;

        }

    });

    setPage(`

<h1>👋 Willkommen zurück</h1>

<p style="margin-bottom:30px;color:#666;">

Hier ist dein aktueller Projektstatus.

</p>

<div class="cards">

<div class="card">

<h3>📁 Projekte</h3>

<h1>${projects.length}</h1>

<p>Aktive Projekte</p>

</div>

<div class="card">

<h3>✅ Offene Aufgaben</h3>

<h1>${openTasks}</h1>

<p>von ${totalTasks} Aufgaben</p>

</div>

<div class="card">

<h3>📅 Besprechungen</h3>

<h1>${meetings}</h1>

<p>Gesamte Meetings</p>

</div>

<div class="card">

<h3>📄 Protokolle</h3>

<h1>${protocols}</h1>

<p>Abgeschlossen</p>

</div>

</div>

<div class="cards">

<div class="card">

<h2>⚡ Schnellzugriff</h2>

<br>

<button class="btn btn-primary"
onclick="showProjects()">

📁 Projekte öffnen

</button>

<br><br>

<button class="btn btn-primary"
onclick="showTasks()">

✅ Aufgaben öffnen

</button>

<br><br>

<button class="btn btn-primary"
onclick="showMeetings()">

📅 Besprechungen öffnen

</button>

</div>

<div class="card">

<h2>📊 Projektübersicht</h2>

<div id="dashboardProjects"></div>

</div>

</div>

<div class="card">

<h2>🔥 Offene Aufgaben</h2>

<div id="dashboardTasks"></div>

</div>

`);

    const projectList =
        document.getElementById("dashboardProjects");

    if(projects.length===0){

        projectList.innerHTML="<p>Noch keine Projekte.</p>";

    }else{

        projects.forEach(project=>{

            projectList.innerHTML+=`

<div style="
display:flex;
justify-content:space-between;
padding:12px 0;
border-bottom:1px solid #eee;">

<div>

<strong>${project.number}</strong>

<br>

<span style="color:#777;">

${project.name}

</span>

</div>

<div>

${project.tasks ? project.tasks.length : 0}

Aufgaben

</div>

</div>

`;

        });

    }
    
    const taskList =
        document.getElementById("dashboardTasks");

    let hasTasks = false;

    projects.forEach(project=>{

        if(!project.tasks)
            return;

        project.tasks
            .filter(task=>task.status!=="Erledigt")
            .slice(0,8)
            .forEach(task=>{

                hasTasks = true;

                let color = "#f59e0b";

                if(task.priority==="Hoch")
                    color="#ef4444";

                if(task.priority==="Niedrig")
                    color="#10b981";

                taskList.innerHTML += `

<div style="
display:flex;
justify-content:space-between;
align-items:center;
padding:14px 0;
border-bottom:1px solid #ececec;">

<div>

<div style="font-weight:600;">

${task.title}

</div>

<div style="
font-size:13px;
color:#777;
margin-top:4px;">

📁 ${project.number}
&nbsp;&nbsp;

👤 ${task.person || "-"}

</div>

</div>

<div style="text-align:right;">

<div style="
display:inline-block;
padding:5px 10px;
border-radius:20px;
background:${color};
color:white;
font-size:12px;">

${task.priority || "-"}

</div>

<br><br>

<div style="
font-size:13px;
color:#777;">

${task.date || "-"}

</div>

</div>

</div>

`;

            });

    });

    if(!hasTasks){

        taskList.innerHTML = `

<div style="
padding:30px;
text-align:center;
color:#777;">

🎉 Keine offenen Aufgaben.

</div>

`;

    }

}
