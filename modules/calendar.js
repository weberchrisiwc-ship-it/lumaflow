// =====================================
// LumaFlow Calendar
// =====================================

function showCalendar(){

    setPage(`

<h1>📅 Kalender</h1>

<div class="card">

<div id="calendar"></div>

</div>

`);

    const events=[];

    projects.forEach(project=>{

        if(project.meetings){

            project.meetings.forEach(meeting=>{

                events.push({

                    title:"📅 "+meeting.title,

                    start:meeting.date,

                    color:"#2450d3"

                });

            });

        }

        if(project.tasks){

            project.tasks.forEach(task=>{

                if(task.date){

                    events.push({

                        title:"✅ "+task.title,

                        start:task.date,

                        color:"#f59e0b"

                    });

                }

            });

        }

    });

    const calendar=new FullCalendar.Calendar(

        document.getElementById("calendar"),

        {

            locale:"de",

            initialView:"dayGridMonth",

            height:750,

            headerToolbar:{

                left:"prev,next today",

                center:"title",

                right:"dayGridMonth,timeGridWeek,listWeek"

            },

            events:events,

            eventClick(info){

                alert(info.event.title);

            }

        }

    );

    calendar.render();

}
