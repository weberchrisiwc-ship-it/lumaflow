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

        this.buildSidebar(events);

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
// =============================================
// Calendar.js Erweiterung (Teil 5)
// =============================================

    selectDate(date){

        const agenda =
            document.getElementById("calendarAgenda");

        let html="";

        projects.forEach(project=>{

            if(project.meetings){

                project.meetings.forEach(meeting=>{

                    if(meeting.date!==date)
                        return;

                    html+=`

<div class="card" style="margin-bottom:12px;">

<div style="font-weight:600;color:#2450d3;">

📅 ${meeting.title}

</div>

<div style="margin-top:6px;">

📁 ${project.number}

</div>

</div>

`;

                });

            }

            if(project.tasks){

                project.tasks.forEach(task=>{

                    if(task.date!==date)
                        return;

                    let icon="🟠";

                    if(task.status==="Erledigt")
                        icon="🟢";

                    if(task.priority==="Hoch")
                        icon="🔴";

                    html+=`

<div class="card" style="margin-bottom:12px;">

<div style="font-weight:600;">

${icon} ${task.title}

</div>

<div style="margin-top:6px;">

👤 ${task.person||"-"}

</div>

<div>

📁 ${project.number}

</div>

</div>

`;

                });

            }

        });

        if(html===""){

            html=`

<div style="
padding:30px;
text-align:center;
color:#888;">

Keine Termine.

</div>

`;

        }

        agenda.innerHTML=html;

    },
// =============================================
// Calendar.js Erweiterung (Teil 6)
// =============================================

    buildTodayPanel(){

        const agenda =
            document.getElementById("calendarAgenda");

        const today =
            new Date().toISOString().substring(0,10);

        let html=`

<h3 style="margin-bottom:15px;">

📅 Heute

</h3>

`;

        let found=false;

        projects.forEach(project=>{

            //----------------------------------
            // Meetings
            //----------------------------------

            (project.meetings||[]).forEach(meeting=>{

                if(meeting.date!==today)
                    return;

                found=true;

                html+=`

<div class="card" style="
border-left:6px solid #2450d3;
margin-bottom:12px;">

<b>📅 ${meeting.title}</b>

<br>

<span style="color:#777;">

${project.number}

</span>

</div>

`;

            });

            //----------------------------------
            // Aufgaben
            //----------------------------------

            (project.tasks||[]).forEach(task=>{

                if(task.date!==today)
                    return;

                found=true;

                let color="#f59e0b";

                if(task.priority==="Hoch")
                    color="#dc2626";

                if(task.status==="Erledigt")
                    color="#10b981";

                html+=`

<div class="card" style="
border-left:6px solid ${color};
margin-bottom:12px;">

<b>✅ ${task.title}</b>

<br>

👤 ${task.person||"-"}

<br>

<span style="color:#777;">

${project.number}

</span>

</div>

`;

            });

        });

        if(!found){

            html+=`

<p style="
padding:25px;
text-align:center;
color:#888;">

🎉 Heute ist nichts geplant.

</p>

`;

        }

        agenda.innerHTML=html;

    },

    //----------------------------------
    // Projektfarben
    //----------------------------------

    getProjectColor(projectId){

        const colors=[

            "#2450d3",
            "#10b981",
            "#f59e0b",
            "#dc2626",
            "#7c3aed",
            "#0891b2",
            "#ec4899",
            "#84cc16"

        ];

        const index=
            projects.findIndex(p=>p.id===projectId);

        return colors[index % colors.length];

    },

    //----------------------------------
    // Legende
    //----------------------------------

    buildLegend(){

        const calendar =
            document.getElementById("calendar");

        calendar.insertAdjacentHTML(

            "afterend",

`

<div class="card" style="margin-top:20px;">

<b>Legende</b>

<br><br>

<span style="color:#2450d3;">
⬤
</span>

Besprechungen

&nbsp;&nbsp;&nbsp;

<span style="color:#f59e0b;">
⬤
</span>

Aufgaben

&nbsp;&nbsp;&nbsp;

<span style="color:#10b981;">
⬤
</span>

Erledigt

&nbsp;&nbsp;&nbsp;

<span style="color:#dc2626;">
⬤
</span>

Hohe Priorität

</div>

`

        );

    },
// =============================================
// Calendar.js Erweiterung (Teil 7)
// Drag & Drop Aufgabenplanung
// =============================================

    renderUnplannedTasks(){

        const calendar =
            document.getElementById("calendar");

        calendar.insertAdjacentHTML("beforebegin",`

<div class="card" id="unplannedTasks" style="margin-bottom:20px;">

<h2>📌 Nicht geplante Aufgaben</h2>

<div id="unplannedList"></div>

</div>

`);

        const list =
            document.getElementById("unplannedList");

        list.innerHTML="";

        projects.forEach(project=>{

            (project.tasks||[]).forEach(task=>{

                if(task.date)
                    return;

                list.innerHTML += `

<div

class="calendarTask"

draggable="true"

data-project="${project.id}"

data-task="${task.id}"

style="
padding:12px;
margin-bottom:10px;
background:white;
border:1px solid #ddd;
border-radius:10px;
cursor:grab;
">

<b>${task.title}</b>

<br>

<span style="color:#777;">

📁 ${project.number}

</span>

</div>

`;

            });

        });

        document
            .querySelectorAll(".calendarTask")
            .forEach(item=>{

                item.addEventListener("dragstart",e=>{

                    e.dataTransfer.setData(

                        "project",
                        item.dataset.project

                    );

                    e.dataTransfer.setData(

                        "task",
                        item.dataset.task

                    );

                });

            });

    },

    //------------------------------------------
    // Aufgabe auf Datum ziehen
    //------------------------------------------

    enableDrop(){

        const calendarEl =
            document.getElementById("calendar");

        calendarEl.addEventListener("dragover",e=>{

            e.preventDefault();

        });

    },

    //------------------------------------------
    // Aufgabe terminieren
    //------------------------------------------

    assignTask(projectId,taskId,date){

        const project =
            projects.find(p=>p.id===projectId);

        if(!project)
            return;

        const task =
            project.tasks.find(t=>t.id===taskId);

        if(!task)
            return;

        task.date=date;
        task.due=date;

        saveProjects();

        this.refresh();

    },

    //------------------------------------------
    // Heute springen
    //------------------------------------------

    goToday(){

        this.calendar.today();

        this.buildTodayPanel();

    },

    //------------------------------------------
    // Alle Aufgaben heute
    //------------------------------------------

    todayTasks(){

        const today =
            new Date().toISOString().substring(0,10);

        this.selectDate(today);

    },
// =============================================
// Calendar.js Erweiterung (Teil 8)
// =============================================

// ----------------------------------
// Projektfarbe anwenden
// ----------------------------------

eventDidMount:(info)=>{

    const color =
        CalendarModule.getProjectColor(
            info.event.extendedProps.projectId
        );

    info.el.style.background = color;
    info.el.style.borderColor = color;
    info.el.style.color = "white";
    info.el.style.borderRadius = "8px";
    info.el.style.padding = "2px";

},

// ----------------------------------
// Datum anklicken
// ----------------------------------

dateClick:(info)=>{

    CalendarModule.selectDate(info.dateStr);

},

// ----------------------------------
// Aufgabe verschieben
// ----------------------------------

eventDrop:(info)=>{

    CalendarModule.moveEvent(info);

},

// ----------------------------------
// Doppelklick = Projekt öffnen
// ----------------------------------

eventDidMount:(info)=>{

    info.el.ondblclick=()=>{

        CalendarModule.openProject(

            info.event.extendedProps.projectId

        );

    };

}
// =============================================
// Dashboard Mini Kalender
// =============================================

miniCalendar(){

    return `

<div class="card">

<h2>📅 Kalender</h2>

<div id="miniCalendar"></div>

</div>

`;

},

renderMiniCalendar(){

    const el =
        document.getElementById("miniCalendar");

    if(!el)
        return;

    const cal = new FullCalendar.Calendar(el,{

        locale:"de",

        initialView:"dayGridMonth",

        headerToolbar:false,

        height:340,

        events:this.calendar.getEvents()

    });

    cal.render();

},
getOverdueTasks(){

    const today =
        new Date().toISOString().substring(0,10);

    let overdue=[];

    projects.forEach(project=>{

        (project.tasks||[]).forEach(task=>{

            if(task.status==="Erledigt")
                return;

            if(!task.date)
                return;

            if(task.date<today){

                overdue.push({

                    ...task,

                    project:project.number

                });

            }

        });

    });

    return overdue;

},
buildWorkload(){

    const workload={};

    projects.forEach(project=>{

        (project.tasks||[]).forEach(task=>{

            if(task.status==="Erledigt")
                return;

            const person =
                task.person || "Nicht zugewiesen";

            if(!workload[person])

                workload[person]=0;

            workload[person]++;

        });

    });

    return workload;

},
renderWorkload(){

    const load =
        this.buildWorkload();

    let html=`

<div class="card">

<h2>👤 Auslastung</h2>

`;

    Object.keys(load).forEach(person=>{

        html+=`

<div style="
margin-bottom:18px;">

<b>${person}</b>

<br>

<progress
value="${load[person]}"
max="20"
style="width:100%;height:18px;">

</progress>

${load[person]} Aufgaben

</div>

`;

    });

    html+="</div>";

    return html;

},
exportCalendar(){

    const data=[];

    this.calendar.getEvents().forEach(event=>{

        data.push({

            Titel:event.title,

            Datum:event.startStr

        });

    });

    const blob=new Blob(

        [JSON.stringify(data,null,2)],

        {type:"application/json"}

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="lumaflow_calendar.json";

    a.click();

},
