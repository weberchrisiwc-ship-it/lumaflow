// ==========================================
// LumaFlow
// Meeting Editor
// Version 0.6
// ==========================================

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
                    id: crypto.randomUUID(),
                    title: "TOP 1",
                    notes: []
                }
            ]

        };

    } else {

        meeting = JSON.parse(
            JSON.stringify(project.meetings[meetingIndex])
        );

        meeting.topics.forEach(topic => {

            if (!topic.notes)
                topic.notes = [];

        });

    }

    window.currentMeeting = meeting;
    window.currentProjectId = projectId;
    window.currentMeetingIndex = meetingIndex;

    renderMeetingEditor();

}

// ==========================================

function renderMeetingEditor() {

    const meeting = window.currentMeeting;

    let html = "";

    meeting.topics.forEach((topic, index) => {

        html += `

<div class="card">

<div style="display:flex;justify-content:space-between;align-items:center;">

<h2>${topic.title}</h2>

<button
class="btn btn-danger"
onclick="removeTopic(${index})">

🗑

</button>

</div>

<input

value="${topic.title}"

placeholder="Titel"

oninput="updateTopicTitle(${index},this.value)"

style="margin-top:15px;">

<br><br>

${renderNotes(index)}

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

placeholder="Teilnehmer"

value="${meeting.participants}"

>

</div>

${html}

<br>

<button
class="btn btn-primary"
onclick="addTopic()">

+ TOP hinzufügen

</button>

<button
class="btn"
onclick="showMeetingsPage(window.currentProjectId)">

← Zurück

</button>

<button
class="btn btn-primary"
onclick="saveMeetingEditor()"
style="float:right;">

💾 Speichern

</button>

`);

}

// ==========================================

function addTopic() {

    window.currentMeeting.topics.push({

        id: crypto.randomUUID(),

        title: "TOP " + (window.currentMeeting.topics.length + 1),

        notes: []

    });

    renderMeetingEditor();

}

function removeTopic(index) {

    if (!confirm("TOP löschen?"))
        return;

    window.currentMeeting.topics.splice(index, 1);

    renderMeetingEditor();

}

function updateTopicTitle(index, value) {

    window.currentMeeting.topics[index].title = value;

}
// ==========================================
// Speichern
// ==========================================

function saveMeetingEditor() {

    const meeting = window.currentMeeting;

    meeting.title = document.getElementById("meetingTitle").value;
    meeting.date = document.getElementById("meetingDate").value;
    meeting.location = document.getElementById("meetingLocation").value;
    meeting.participants = document.getElementById("meetingParticipants").value;

    const project = projects.find(p => p.id === window.currentProjectId);

    if (window.currentMeetingIndex === null) {

        project.meetings.push(meeting);

    } else {

        project.meetings[window.currentMeetingIndex] = meeting;

    }

    saveProjects();

    showMeetingsPage(window.currentProjectId);

}

// ==========================================
// Besprechung abschließen
// ==========================================

function finishMeeting() {

    saveMeetingEditor();

    const project = projects.find(
        p => p.id === window.currentProjectId
    );

    const meeting = project.meetings[
        window.currentMeetingIndex === null
            ? project.meetings.length - 1
            : window.currentMeetingIndex
    ];

    saveMeetingResults(project.id, meeting);

    const protocol = createMeetingProtocol(meeting);

    window.currentProtocol = protocol;

    alert("Besprechung erfolgreich abgeschlossen.");

    showMeetingsPage(project.id);

}

// ==========================================
// Vorschau Protokoll
// ==========================================

function previewProtocol() {

    const protocol = createMeetingProtocol(
        window.currentMeeting
    );

    const win = window.open("", "_blank");

    win.document.write(`
        <html>

        <head>

        <title>Protokoll</title>

        <style>

        body{

            font-family:Segoe UI;
            padding:40px;

        }

        h2{

            color:#2450d3;

        }

        pre{

            white-space:pre-wrap;

            font-family:inherit;

            background:#f5f5f5;

            padding:15px;

            border-radius:8px;

        }

        </style>

        </head>

        <body>

        ${protocol}

        </body>

        </html>

    `);

}

// ==========================================
// Toolbar
// ==========================================

function meetingToolbar(){

    return `

<br>

<div
style="display:flex;
justify-content:space-between;
margin-top:25px;">

<div>

<button
class="btn"
onclick="showMeetingsPage(window.currentProjectId)">

← Zurück

</button>

</div>

<div>

<button
class="btn"

onclick="previewProtocol()">

👁 Vorschau

</button>

<button
class="btn btn-primary"

onclick="saveMeetingEditor()">

💾 Speichern

</button>

<button
class="btn btn-primary"

style="margin-left:10px;"

onclick="finishMeeting()">

✅ Besprechung abschließen

</button>

</div>

</div>

`;

}
