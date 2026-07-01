// =============================================
// LumaFlow
// Meeting Editor
// Version 3.0
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
                quickNotes: "",
                topics: []
            };

        } else {

            this.meeting = JSON.parse(
                JSON.stringify(this.project.meetings[meetingIndex])
            );

            if(!this.meeting.topics)
                this.meeting.topics=[];

            if(!this.meeting.quickNotes)
                this.meeting.quickNotes="";

        }

        this.render();

    },

    render(){

        let html=`

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

<div class="card">

<h2>📝 Besprechungsnotizen</h2>

<p style="color:#777;margin-bottom:15px;">

Einfach alles mitschreiben. Die Struktur kommt danach.

</p>

<textarea

id="meetingQuickNotes"

style="
width:100%;
height:240px;
resize:vertical;
"

placeholder="Einfach schreiben...

Der Bauherr möchte RGB.

Christoph prüft Bemusterung.

Variante B beschlossen.

Jour Fixe am 15.08.
"

>${this.meeting.quickNotes}</textarea>

<br><br>

<button

class="btn btn-primary"

onclick="MeetingEditor.parseQuickNotes()">

🪄 Notizen strukturieren

</button>

</div>

<div id="meetingTopics"></div>

<br>

<div style="display:flex;justify-content:space-between;align-items:center;">

<div>

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

</div>

<div style="display:flex;gap:10px;">

<button
class="btn"
onclick="MeetingProtocol.preview()">

👁 Vorschau

</button>

<button
class="btn btn-primary"
onclick="MeetingEditor.save()">

💾 Speichern

</button>

<button
class="btn btn-success"
onclick="MeetingEditor.finish()">

✅ Abschließen

</button>

</div>

</div>

`;

        setPage(html);

        this.renderTopics();

    },

    renderTopics(){

        const container=document.getElementById("meetingTopics");

        container.innerHTML="";

        this.meeting.topics.forEach((topic,index)=>{

            if(!topic.notes)
                topic.notes=[];

            container.innerHTML+=`

<div class="card">

<h2>TOP ${index+1}</h2>

<input

value="${topic.title}"

placeholder="Titel"

oninput="MeetingEditor.updateTopic(${index},this.value)"

style="width:100%;margin-bottom:15px;">

<div id="notes_${index}"></div>

<br>

<button
class="btn btn-primary"
onclick="MeetingNotes.add(${index})">

+ Eintrag

</button>

<button
class="btn btn-danger"
onclick="MeetingEditor.removeTopic(${index})">

TOP löschen

</button>

</div>

`;

            MeetingNotes.render(index);

        });

    },
        addTopic(){

        this.meeting.topics.push({

            id: crypto.randomUUID(),
            title: "",
            notes: []

        });

        this.render();

    },

    removeTopic(index){

        if(!confirm("TOP wirklich löschen?"))
            return;

        this.meeting.topics.splice(index,1);

        this.render();

    },

    updateTopic(index,value){

        this.meeting.topics[index].title=value;

    },

    save(close=true){

        this.meeting.title=
            document.getElementById("meetingTitle").value;

        this.meeting.date=
            document.getElementById("meetingDate").value;

        this.meeting.location=
            document.getElementById("meetingLocation").value;

        this.meeting.quickNotes=
            document.getElementById("meetingQuickNotes").value;

        this.meeting.participants=
            document.getElementById("meetingParticipants")
            .value
            .split(",")
            .map(p=>p.trim())
            .filter(p=>p!="");

        if(!this.project.meetings)
            this.project.meetings=[];

        if(this.meetingIndex===null){

            this.project.meetings.push(this.meeting);

            this.meetingIndex=this.project.meetings.length-1;

        }else{

            this.project.meetings[this.meetingIndex]=this.meeting;

        }

        saveProjects();

        if(close){

            MeetingModule.open(this.project.id);

        }

    },

parseQuickNotes(){

    this.meeting.quickNotes =
        document.getElementById("meetingQuickNotes").value;

    const notes = MeetingParser.parse(this.meeting.quickNotes);

    if(notes.length === 0){

        alert("Keine Notizen gefunden.");
        return;

    }

    if(this.meeting.topics.length === 0){

        this.meeting.topics.push({

            id: crypto.randomUUID(),

            title: "Besprechungsnotizen",

            notes: []

        });

    }

    const topic = this.meeting.topics[0];

    notes.forEach(note=>{

        const exists = topic.notes.some(n=>n.title===note.title);

        if(!exists){

            topic.notes.push(note);

        }

    });

    this.render();

},

    finish(){

        this.save(false);

        const meeting=this.project.meetings[this.meetingIndex];

        if(meeting.status==="closed"){

            alert("Diese Besprechung wurde bereits abgeschlossen.");

            return;

        }

        meeting.status="closed";
        meeting.closedAt=new Date().toISOString();

        if(!this.project.tasks)
            this.project.tasks=[];

        meeting.topics.forEach(topic=>{

            (topic.notes||[]).forEach(note=>{

                if(note.type!=="todo")
                    return;

                const exists=this.project.tasks.some(task=>

                    task.noteId===note.id

                );

                if(exists)
                    return;

                this.project.tasks.push({

                    id:crypto.randomUUID(),

                    noteId:note.id,

                    meeting:meeting.id,

                    meetingTitle:meeting.title,

                    topic:topic.title,

                    title:note.title,

                    description:note.description,

                    person:note.assigned,

                    assigned:note.assigned,

                    date:note.due,

                    due:note.due,

                    priority:note.priority,

                    status:note.status || "Offen",

                    created:new Date().toISOString()

                });

            });

        });

        saveProjects();

        alert("✅ Besprechung abgeschlossen.");

        MeetingModule.open(this.project.id);

    }

};
