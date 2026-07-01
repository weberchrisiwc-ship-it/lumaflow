// =========================================
// LumaFlow
// Meeting Editor
// Version 0.4
// =========================================

function openMeetingEditor(projectId, meetingIndex = null) {

    const project = projects.find(p => p.id === projectId);

    let meeting;

    if (meetingIndex === null) {

        meeting = {

            id: crypto.randomUUID(),

            title: "",

            date: new Date().toISOString().split("T")[0],

            location: "",

            participants: "",

            topics: [

                {
                    title: "TOP 1",
                    notes: ""
                }

            ]

        };

    } else {

        meeting = project.meetings[meetingIndex];

    }

    window.currentMeeting = meeting;
    window.currentProjectId = projectId;
    window.currentMeetingIndex = meetingIndex;

    renderMeetingEditor();

}

function renderMeetingEditor() {

    const meeting = window.currentMeeting;

    let topicsHTML = "";

    meeting.topics.forEach((topic, index) => {

        topicsHTML += `

<div class="card" style="margin-bottom:20px;">

<h3>${topic.title}</h3>

<input
value="${topic.title}"
oninput="updateTopicTitle(${index},this.value)">

<textarea

style="width:100%;
height:180px;
margin-top:15px;
padding:12px;
border:1px solid #ddd;
border-radius:10px;
resize:vertical;"

placeholder="Hier einfach mitschreiben..."

oninput="updateTopicNotes(${index},this.value)"

>${topic.notes}</textarea>

</div>

`;

    });

    setPage(`

<h1>📅 Besprechung</h1>

<div class="card">

<input

id="meetingTitle"

placeholder="Titel"

value="${meeting.title}"

style="margin-bottom:15px;">

<input

type="date"

id="meetingDate"

value="${meeting.date}"

style="margin-bottom:15px;">

<input

id="meetingLocation"

placeholder="Ort"

value="${meeting.location}"

style="margin-bottom:15px;">

<input

id="meetingParticipants"

placeholder="Teilnehmer (mit Komma trennen)"

value="${meeting.participants}"

>

</div>

<br>

${topicsHTML}

<button

class="btn btn-primary"

onclick="addTopic()">

+ TOP hinzufügen

</button>

<br><br>

<button

class="btn btn-primary"

onclick="saveMeetingEditor()">

💾 Speichern

</button>

<button

class="btn"

onclick="showMeetingsPage(window.currentProjectId)">

← Zurück

</button>

`);

}

function addTopic(){

    window.currentMeeting.topics.push({

        title:"TOP "+(window.currentMeeting.topics.length+1),

        notes:""

    });

    renderMeetingEditor();

}

function updateTopicTitle(index,value){

    window.currentMeeting.topics[index].title=value;

}

function updateTopicNotes(index,value){

    window.currentMeeting.topics[index].notes=value;

}

function saveMeetingEditor(){

    const meeting=window.currentMeeting;

    meeting.title=document.getElementById("meetingTitle").value;
    meeting.date=document.getElementById("meetingDate").value;
    meeting.location=document.getElementById("meetingLocation").value;
    meeting.participants=document.getElementById("meetingParticipants").value;

    const project=projects.find(p=>p.id===window.currentProjectId);

    if(window.currentMeetingIndex===null){

        project.meetings.push(meeting);

    }else{

        project.meetings[window.currentMeetingIndex]=meeting;

    }

    saveProjects();

    showMeetingsPage(window.currentProjectId);

}
