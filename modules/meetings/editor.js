// =============================================
// LumaFlow
// Meeting Editor
// Version 1.0
// =============================================

const MeetingEditor = {

    project: null,
    meeting: null,
    meetingIndex: null,

    open(projectId, meetingIndex = null) {

        this.project = projects.find(p => p.id === projectId);
        this.meetingIndex = meetingIndex;

        if (meetingIndex === null) {

            this.meeting = {

                id: crypto.randomUUID(),

                title: "",

                date: new Date().toISOString().substring(0,10),

                location: "",

                participants: [],

                topics: []

            };

        } else {

            this.meeting = JSON.parse(
                JSON.stringify(
                    this.project.meetings[meetingIndex]
                )
            );

        }

        this.render();

    },

    render(){

        let html = `

<h1>📅 Besprechung</h1>

<div class="card">

<label>Titel</label>

<input
id="meetingTitle"
value="${this.meeting.title}"
style="width:100%;margin-bottom:15px;">

<label>Datum</label>

<input
type="date"
id="meetingDate"
value="${this.meeting.date}"
style="width:100%;margin-bottom:15px;">

<label>Ort</label>

<input
id="meetingLocation"
value="${this.meeting.location}"
style="width:100%;margin-bottom:15px;">

<label>Teilnehmer</label>

<input
id="meetingParticipants"
placeholder="Christoph, Martin ..."
value="${this.meeting.participants.join(", ")}">

</div>

<div id="meetingTopics">

</div>

<br>

<button
class="btn btn-primary"
onclick="MeetingEditor.addTopic()">

+ TOP

</button>

<button
class="btn"
onclick="MeetingModule.open('${this.project.id}')">

← Zurück

</button>

<button
class="btn btn-primary"
style="float:right"
onclick="MeetingEditor.save()">

💾 Speichern

</button>

`;

        setPage(html);

        this.renderTopics();

    },

    renderTopics(){

        const container =
            document.getElementById("meetingTopics");

        container.innerHTML="";

        this.meeting.topics.forEach((topic,index)=>{

            container.innerHTML += `

<div class="card">

<h2>

TOP ${index+1}

</h2>

<input

value="${topic.title}"

placeholder="Titel"

oninput="MeetingEditor.updateTopic(${index},this.value)"

style="width:100%;margin-bottom:15px;">

<div id="notes_${index}"></div>

<button

class="btn btn-primary"

onclick="MeetingNotes.add(${index})">

+ Eintrag

</button>

</div>

`;

            MeetingNotes.render(index);

        });

    },

    addTopic(){

        this.meeting.topics.push({

            id:crypto.randomUUID(),

            title:"",

            notes:[]

        });

        this.render();

    },

    updateTopic(index,value){

        this.meeting.topics[index].title=value;

    },

    save(){

        this.meeting.title=
            document.getElementById("meetingTitle").value;

        this.meeting.date=
            document.getElementById("meetingDate").value;

        this.meeting.location=
            document.getElementById("meetingLocation").value;

        this.meeting.participants=
            document.getElementById("meetingParticipants")
            .value
            .split(",");

        if(this.meetingIndex===null){

            this.project.meetings.push(this.meeting);

        }else{

            this.project.meetings[this.meetingIndex]=this.meeting;

        }

        saveProjects();

        MeetingModule.open(this.project.id);

    }

};
