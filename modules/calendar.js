// =============================================
// LumaFlow Calendar
// Version 1.0
// =============================================

const CalendarModule = {

    calendar: null,

    show(){

        const events = [];

        projects.forEach(project=>{

            // Meetings
            if(project.meetings){

                project.meetings.forEach(meeting=>{

                    events.push({

                        id:meeting.id,

                        title:"📅 "+meeting.title,

                        start:meeting.date,

                        backgroundColor:"#2450d3",

                        borderColor:"#2450d3",

                        extendedProps:{
                            type:"meeting",
                            projectId:project.id,
                            meetingId:meeting.id,
                            project:project.number
                        }

                    });

                });

            }

            // Tasks
            if(project.tasks){

                project.tasks.forEach(task=>{

                    if(!task.date) return;

                    let color="#f59e0b";

                    if(task.status==="Erledigt")
                        color="#10b981";

                    if(task.priority==="Hoch")
                        color="#dc2626";

                    events.push({

                        id:task.id,

                        title:"✅ "+task.title,

                        start:task.date,

                        backgroundColor:color,

                        borderColor:color,

                        extendedProps:{
                            type:"task",
                            projectId:project.id,
                            taskId:task.id,
                            person:task.person,
                            priority:task.priority,
                            project:project.number
                        }

                    });

                });

            }

        });

        setPage(`

<h1>📅 Kalender</h1>

<div class="cards">

<div class="card" style="grid-column:span 3;">

<div id="calendar"></div>

</div>

<div class="card">

<h2>📋 Tagesübersicht</h2>

<div id="calendarAgenda">

<p style="color:#777;">

Termin auswählen.

</p>

</div>

</div>

</div>

`);

        this.calendar = new FullCalendar.Calendar(

            document.getElementById("calendar"),

            {

                locale:"de",

                initialView:"dayGridMonth",

                height:780,

                editable:true,

                selectable:true,

                nowIndicator:true,

                firstDay:1,

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

                eventDrop:(info)=>{

                    CalendarModule.moveEvent(info);

                }

            }

        );

        this.calendar.render();

    },
        showDetails(event){

        const agenda =
            document.getElementById("calendarAgenda");

        const p = event.extendedProps;

        let html = `

<div style="margin-bottom:20px;">

<h3>${event.title}</h3>

<p style="margin-top:10px;color:#666;">

📁 ${p.project}

</p>

<p>

📅 ${event.start.toLocaleDateString("de-DE")}

</p>

`;

        if(p.person){

            html += `

<p>

👤 ${p.person}

</p>

`;

        }

        if(p.priority){

            html += `

<p>

⚡ Priorität:

<b>${p.priority}</b>

</p>

`;

        }

        html += `

<br>

`;

        if(p.type==="meeting"){

            html += `

<button

class="btn btn-primary"

onclick="CalendarModule.openMeeting('${p.projectId}','${p.meetingId}')">

📅 Besprechung öffnen

</button>

`;

        }

        if(p.type==="task"){

            html += `

<button

class="btn btn-primary"

onclick="CalendarModule.openProject('${p.projectId}')">

📁 Projekt öffnen

</button>

`;

        }

        html += `

</div>

`;

        agenda.innerHTML = html;

    },

    moveEvent(info){

        const p = info.event.extendedProps;

        const newDate =
            info.event.start.toISOString().substring(0,10);

        const project =
            projects.find(x=>x.id===p.projectId);

        if(!project)
            return;

        if(p.type==="task"){

            const task =
                project.tasks.find(t=>t.id===p.taskId);

            if(task){

                task.date = newDate;
                task.due = newDate;

            }

        }

        if(p.type==="meeting"){

            const meeting =
                project.meetings.find(m=>m.id===p.meetingId);

            if(meeting){

                meeting.date = newDate;

            }

        }

        saveProjects();

    },
        openProject(projectId){

        const index =
            projects.findIndex(p=>p.id===projectId);

        if(index>-1){

            openProject(index);

        }

    },

    openMeeting(projectId,meetingId){

        const project =
            projects.find(p=>p.id===projectId);

        if(!project)
            return;

        const meetingIndex =
            project.meetings.findIndex(m=>m.id===meetingId);

        if(meetingIndex<0)
            return;

        MeetingEditor.open(projectId,meetingIndex);

    },

    refresh(){

        if(this.calendar){

            this.show();

        }

    }

};

// =============================================
// Öffentliche Funktion
// =============================================

function showCalendar(){

    CalendarModule.show();

}
// =============================================
// Calendar.js Erweiterung (Teil 4)
// =============================================

    buildSidebar(events){

        const calendar=document.getElementById("calendar");

        calendar.insertAdjacentHTML("beforebegin",`

<div class="card" id="calendarFilter" style="margin-bottom:20px;">

<h2>📌 Filter</h2>

<label>

<input type="checkbox" id="filterTasks" checked>

 Aufgaben

</label>

<br>

<label>

<input type="checkbox" id="filterMeetings" checked>

 Besprechungen

</label>

<br>

<label>

<input type="checkbox" id="filterProtocols" checked>

 Protokolle

</label>

<hr>

<h3 style="margin-top:20px;">📁 Projekte</h3>

<div id="projectFilterList"></div>

</div>

`);

        const list=document.getElementById("projectFilterList");

        projects.forEach(project=>{

            list.innerHTML+=`

<label style="display:block;margin-top:8px;">

<input
type="checkbox"
checked
class="projectFilter"
value="${project.id}">

${project.number}

</label>

`;

        });

        document
            .querySelectorAll("#calendarFilter input")
            .forEach(cb=>{

                cb.addEventListener("change",()=>{

                    CalendarModule.applyFilter(events);

                });

            });

    },

    applyFilter(allEvents){

        const showTasks=
            document.getElementById("filterTasks").checked;

        const showMeetings=
            document.getElementById("filterMeetings").checked;

        const showProtocols=
            document.getElementById("filterProtocols").checked;

        const activeProjects=[];

        document
            .querySelectorAll(".projectFilter")
            .forEach(cb=>{

                if(cb.checked)

                    activeProjects.push(cb.value);

            });

        const filtered=

            allEvents.filter(event=>{

                const p=event.extendedProps;

                if(!activeProjects.includes(p.projectId))
                    return false;

                if(p.type==="task" && !showTasks)
                    return false;

                if(p.type==="meeting" && !showMeetings)
                    return false;

                if(p.type==="protocol" && !showProtocols)
                    return false;

                return true;

            });

        this.calendar.removeAllEvents();

        filtered.forEach(event=>{

            this.calendar.addEvent(event);

        });

    },
