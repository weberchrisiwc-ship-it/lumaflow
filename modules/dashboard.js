// =============================================
// LumaFlow Dashboard 3.0
// =============================================

function showDashboard(){

    const totalProjects = projects.length;

    let totalTasks = 0;
    let openTasks = 0;
    let totalMeetings = 0;
    let totalProtocols = 0;

    const today =
        new Date().toISOString().substring(0,10);

    let todayItems = "";

    projects.forEach(project=>{

        totalMeetings += project.meetings.length;
        totalProtocols += project.protocols.length;
        totalTasks += project.tasks.length;

        project.tasks.forEach(task=>{

            if(task.status!=="Erledigt")
                openTasks++;

            if(task.date===today){

                todayItems += `

<div class="card">

<b>✅ ${task.title}</b>

<br>

${project.number}

</div>

`;

            }

        });

        project.meetings.forEach(meeting=>{

            if(meeting.date===today){

                todayItems += `

<div class="card">

<b>📅 ${meeting.title}</b>

<br>

${project.number}

</div>

`;

            }

        });

    });

    if(todayItems===""){

        todayItems=`

<div class="card">

Heute stehen keine Termine an.

</div>

`;

    }

    setPage(`

<h1>Dashboard</h1>

<p>

Willkommen bei LumaFlow.

</p>

<div class="cards">

<div class="card">

<h3>📁 Projekte</h3>

<h1>${totalProjects}</h1>

</div>

<div class="card">

<h3>🔥 Offene Aufgaben</h3>

<h1>${openTasks}</h1>

</div>

<div class="card">

<h3>📅 Besprechungen</h3>

<h1>${totalMeetings}</h1>

</div>

<div class="card">

<h3>📄 Protokolle</h3>

<h1>${totalProtocols}</h1>

</div>

</div>

<div class="cards">

<div class="card">

<h2>📅 Heute</h2>

<div id="todayList">

${todayItems}

</div>

</div>

<div class="card">

<h2>📁 Projekte</h2>

<div id="projectOverview">

</div>

</div>

</div>

`);

    renderDashboardProjects();

}
// =============================================
// Dashboard Projekte
// =============================================

function renderDashboardProjects(){

    const container =
        document.getElementById("projectOverview");

    container.innerHTML="";

    if(projects.length===0){

        container.innerHTML=`

<div class="card">

Noch keine Projekte vorhanden.

</div>

`;

        return;

    }

    projects.forEach((project,index)=>{

        const totalTasks =
            project.tasks.length;

        const openTasks =
            project.tasks.filter(t=>t.status!=="Erledigt").length;

        const progress =
            totalTasks===0
            ?0
            :Math.round(((totalTasks-openTasks)/totalTasks)*100);

        container.innerHTML+=`

<div class="card">

<div style="
display:flex;
justify-content:space-between;
align-items:center;">

<div>

<b>${project.number}</b>

<br>

${project.name}

</div>

<div>

${project.status}

</div>

</div>

<br>

<div style="
height:8px;
background:#e8edf5;
border-radius:8px;
overflow:hidden;">

<div style="
height:8px;
width:${progress}%;
background:#2450d3;">

</div>

</div>

<p style="margin-top:10px;">

${progress}% abgeschlossen

</p>

<div style="
display:flex;
justify-content:space-between;
margin-top:15px;">

<span>🔥 ${openTasks} offen</span>

<span>📅 ${project.meetings.length}</span>

</div>

<br>

<button
class="btn btn-primary"
style="width:100%;"
onclick="openProject(${index})">

Projekt öffnen

</button>

</div>

`;

    });

}
