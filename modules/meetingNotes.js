// ==========================================
// LumaFlow
// Meeting Notes
// ==========================================

const NOTE_TYPES = [
    { value: "info", text: "ℹ️ Information" },
    { value: "todo", text: "☑ Aufgabe" },
    { value: "decision", text: "✔ Beschluss" },
    { value: "appointment", text: "📅 Termin" }
];

function createEmptyNote() {

    return {

        id: crypto.randomUUID(),

        type: "info",

        text: "",

        assigned: "",

        due: ""

    };

}

function addNote(topicIndex){

    const meeting = window.currentMeeting;

    if(!meeting.topics[topicIndex].notes){

        meeting.topics[topicIndex].notes=[];

    }

    meeting.topics[topicIndex].notes.push(
        createEmptyNote()
    );

    renderMeetingEditor();

}

function removeNote(topicIndex,noteIndex){

    window.currentMeeting.topics[topicIndex].notes.splice(noteIndex,1);

    renderMeetingEditor();

}

function updateNote(topicIndex,noteIndex,field,value){

    window.currentMeeting.topics[topicIndex].notes[noteIndex][field]=value;

}

function renderNotes(topicIndex){

    const topic = window.currentMeeting.topics[topicIndex];

    if(!topic.notes){

        topic.notes=[];

    }

    let html="";

    topic.notes.forEach((note,noteIndex)=>{

        html+=`

<div class="card" style="margin-top:15px;">

<select onchange="updateNote(${topicIndex},${noteIndex},'type',this.value)">

${NOTE_TYPES.map(type=>`

<option value="${type.value}"
${note.type===type.value ? "selected":""}>

${type.text}

</option>

`).join("")}

</select>

<br><br>

<textarea

placeholder="Notiz..."

style="width:100%;height:100px;"

oninput="updateNote(${topicIndex},${noteIndex},'text',this.value)"

>${note.text}</textarea>

<br><br>

<input

placeholder="Verantwortlich"

value="${note.assigned}"

oninput="updateNote(${topicIndex},${noteIndex},'assigned',this.value)"

>

<br><br>

<input

type="date"

value="${note.due}"

onchange="updateNote(${topicIndex},${noteIndex},'due',this.value)"

>

<br><br>

<button

class="btn btn-danger"

onclick="removeNote(${topicIndex},${noteIndex})">

🗑 Notiz löschen

</button>

</div>

`;

    });

    html+=`

<br>

<button

class="btn btn-primary"

onclick="addNote(${topicIndex})">

+ Neue Notiz

</button>

`;

    return html;

}
