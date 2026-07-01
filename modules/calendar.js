// =============================================
// LumaFlow Calendar
// Version 1.0
// Teil 1 / 4
// =============================================

const CalendarModule = {

    calendar: null,

    show(){

        const events = [];

        projects.forEach(project=>{

            //----------------------------------
            // Meetings
            //----------------------------------

            (project.meetings || []).forEach(meeting=>{

                events.push({

                    id:meeting.id,

                    title:"📅 "+meeting.title,

                    start:meeting.date,

                    color:"#2450d3",

                    extendedProps:{

                        type:"meeting",

                        projectId:project.id,

                        meetingId:meeting.id,

                        project:project.number,

                        object:meeting

                    }

                });

            });

            //----------------------------------
            // Aufgaben
            //----------------------------------

            (project.tasks || []).forEach(task=>{

                if(!task.date)
                    return;

                let color="#f59e0b";

                if(task.priority==="Hoch")
                    color="#dc2626";

                if(task.status==="Erledigt")
                    color="#10b981";

                events.push({

                    id:task.id,

                    title:"✅ "+task.title,

                    start:task.date,

                    color:color,

                    extendedProps:{

                        type:"task",

                        projectId:project.id,

                        taskId:task.id,

                        project:project.number,

                        object:task

                    }

                });

            });

        });

        setPage(`

<h1>📅 Kalender</h1>

<div style="
display:grid;
grid-template-columns:280px 1fr 320px;
gap:20px;">

<div id="calendarSidebar"></div>

<div class="card">

<div id="calendar"></div>

</div>

<div id="calendarAgenda"></div>

</div>

`);

        this.renderSidebar();

        this.renderAgenda();

        this.calendar = new FullCalendar.Calendar(

            document.getElementById("calendar"),

            {

                locale:"de",

                initialView:"dayGridMonth",

                firstDay:1,

                editable:true,

                selectable:true,

                nowIndicator:true,

                height:820,

                headerToolbar:{

                    left:"prev,next today",

                    center:"title",

                    right:"dayGridMonth,timeGridWeek,timeGridDay,listWeek"

                },

                buttonText:{

                    today:"Heute",

                    month:"Monat",

                    week:"Woche",

                    day:"Tag",

                    list:"Liste"

                },

                events:events,
                                eventClick:(info)=>{

                    CalendarModule.showDetails(info.event);

                },

                dateClick:(info)=>{

                    CalendarModule.showDay(info.dateStr);

                },

                eventDrop:(info)=>{

                    CalendarModule.moveEvent(info);

                }

            }

        );

        this.calendar.render();

    },

    // ==========================================
    // SIDEBAR
    // ==========================================

    renderSidebar(){

        document.getElementById("calendarSidebar").innerHTML=`

<div class="card">

<h2>📌 Übersicht</h2>

<p><span style="color:#2450d3;">⬤</span> Besprechungen</p>

<p><span style="color:#f59e0b;">⬤</span> Aufgaben</p>

<p><span style="color:#10b981;">⬤</span> Erledigt</p>

<p><span style="color:#dc2626;">⬤</span> Hohe Priorität</p>

<br>

<button
class="btn btn-primary"
style="width:100%;"
onclick="CalendarModule.gotoToday()">

Heute

</button>

</div>

<div class="card">

<h2>📊 Statistik</h2>

<p>

📁 Projekte:
<b>${projects.length}</b>

</p>

<p>

📅 Besprechungen:
<b>${projects.reduce((a,p)=>a+(p.meetings?.length||0),0)}</b>

</p>

<p>

✅ Aufgaben:
<b>${projects.reduce((a,p)=>a+(p.tasks?.length||0),0)}</b>

</p>

</div>

`;

    },

    // ==========================================
    // AGENDA
    // ==========================================

    renderAgenda(){

        document.getElementById("calendarAgenda").innerHTML=`

<div class="card">

<h2>📋 Agenda</h2>

<p style="color:#777;">

Wähle einen Termin oder Tag.

</p>

<div id="agendaContent"></div>

</div>

`;

    },
    // ==========================================
    // DETAILS
    // ==========================================

    showDetails(event){

        const p = event.extendedProps;

        let html = `

<h3>${event.title}</h3>

<p>

📁 <b>${p.project}</b>

</p>

<p>

📅 ${event.start.toLocaleDateString("de-DE")}

</p>

`;

        if(p.type==="task"){

            html += `

<p>

Status:
<b>${p.object.status || "Offen"}</b>

</p>

<p>

Priorität:
<b>${p.object.priority || "-"}</b>

</p>

<p>

Verantwortlich:
<b>${p.object.person || "-"}</b>

</p>

<br>

<button
class="btn btn-primary"
style="width:100%;"
onclick="CalendarModule.openProject('${p.projectId}')">

📁 Projekt öffnen

</button>

`;

        }

        if(p.type==="meeting"){

            html += `

<p>

Ort:
<b>${p.object.location || "-"}</b>

</p>

<p>

Teilnehmer:
<br>

${(p.object.participants || []).join("<br>")}

</p>

<br>

<button
class="btn btn-primary"
style="width:100%;"
onclick="CalendarModule.openMeeting('${p.projectId}','${p.meetingId}')">

📅 Besprechung öffnen

</button>

`;

        }

        document.getElementById("agendaContent").innerHTML =
            html;

    },

    // ==========================================
    // TAGESANSICHT
    // ==========================================

    showDay(date){

        let html="";

        projects.forEach(project=>{

            (project.meetings || []).forEach(meeting=>{

                if(meeting.date!==date)
                    return;

                html += `

<div class="card" style="margin-bottom:12px;">

<b>📅 ${meeting.title}</b>

<br>

<span style="color:#666;">

${project.number}

</span>

</div>

`;

            });

            (project.tasks || []).forEach(task=>{

                if(task.date!==date)
                    return;

                html += `

<div class="card" style="margin-bottom:12px;">

<b>✅ ${task.title}</b>

<br>

👤 ${task.person || "-"}

<br>

<span style="color:#666;">

${project.number}

</span>

</div>

`;

            });

        });

        if(html===""){

            html=`

<p style="padding:20px;color:#888;">

Keine Termine.

</p>

`;

        }

        document.getElementById("agendaContent").innerHTML =
            html;

    },  
      // ==========================================
    // TERMIN VERSCHIEBEN
    // ==========================================

    moveEvent(info){

        const p = info.event.extendedProps;

        const newDate =
            info.event.start.toISOString().substring(0,10);

        const project =
            projects.find(x=>x.id===p.projectId);

        if(!project)
            return;

        if(p.type==="meeting"){

            const meeting =
                project.meetings.find(m=>m.id===p.meetingId);

            if(meeting){

                meeting.date = newDate;

            }

        }

        if(p.type==="task"){

            const task =
                project.tasks.find(t=>t.id===p.taskId);

            if(task){

                task.date = newDate;
                task.due = newDate;

            }

        }

        saveProjects();

    },

    // ==========================================
    // HEUTE
    // ==========================================

    gotoToday(){

        this.calendar.today();

        const today =
            new Date().toISOString().substring(0,10);

        this.showDay(today);

    },

    // ==========================================
    // PROJEKT ÖFFNEN
    // ==========================================

    openProject(projectId){

        const index =
            projects.findIndex(p=>p.id===projectId);

        if(index>-1){

            openProject(index);

        }

    },

    // ==========================================
    // BESPRECHUNG ÖFFNEN
    // ==========================================

    openMeeting(projectId,meetingId){

        const project =
            projects.find(p=>p.id===projectId);

        if(!project)
            return;

        const meetingIndex =
            project.meetings.findIndex(

                m=>m.id===meetingId

            );

        if(meetingIndex>-1){

            MeetingEditor.open(

                projectId,

                meetingIndex

            );

        }

    }

};

// ==========================================
// Öffentliche Funktion
// ==========================================

function showCalendar(){

    CalendarModule.show();

}  
