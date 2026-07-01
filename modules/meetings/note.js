// =============================================
// LumaFlow
// Meeting Notes
// Version 1.0
// =============================================

const MeetingNotes = {

    types: [
        { value: "todo", text: "☑ Aufgabe" },
        { value: "info", text: "ℹ Information" },
        { value: "decision", text: "✔ Beschluss" },
        { value: "appointment", text: "📅 Termin" }
    ],

    add(topicIndex){

        MeetingEditor.meeting.topics[topicIndex].notes.push({

            id: crypto.randomUUID(),

            type: "todo",

            title: "",

            description: "",

            assigned: "",

            due: "",

            priority: "Mittel"

        });

        MeetingEditor.render();

    },

    remove(topicIndex,noteIndex){

        if(!confirm("Eintrag löschen?"))
            return;

        MeetingEditor.meeting
            .topics[topicIndex]
            .notes
            .splice(noteIndex,1);

        MeetingEditor.render();

    },

    render(topicIndex){

        const container =
            document.getElementById("notes_"+topicIndex);

        if(!container) return;

        container.innerHTML="";

        const notes =
            MeetingEditor.meeting
            .topics[topicIndex]
            .notes;

        notes.forEach((note,noteIndex)=>{

            container.innerHTML += `

<div class="card"
style="margin-top:15px;background:#fafafa;">

<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;">

<select
onchange="
MeetingNotes.update(${topicIndex},${noteIndex},'type',this.value)
">

${MeetingNotes.types.map(type=>`

<option
value="${type.value}"
${note.type===type.value?"selected":""}>

${type.text}

</option>

`).join("")}

</select>

<button
class="btn btn-danger"
onclick="
MeetingNotes.remove(${topicIndex},${noteIndex})
">

🗑

</button>

</div>

<input
placeholder="Titel"

value="${note.title}"

oninput="
MeetingNotes.update(${topicIndex},${noteIndex},'title',this.value)
"

style="width:100%;margin-bottom:10px;">

<textarea

placeholder="Beschreibung"

oninput="
MeetingNotes.update(${topicIndex},${noteIndex},'description',this.value)
"

style="width:100%;height:90px;margin-bottom:10px;"

>${note.description}</textarea>

<input

placeholder="Verantwortlich"

value="${note.assigned}"

oninput="
MeetingNotes.update(${topicIndex},${noteIndex},'assigned',this.value)
"

style="width:100%;margin-bottom:10px;">

<input

type="date"

value="${note.due}"

onchange="
MeetingNotes.update(${topicIndex},${noteIndex},'due',this.value)
"

style="width:100%;margin-bottom:10px;">

<select

onchange="
MeetingNotes.update(${topicIndex},${noteIndex},'priority',this.value)
"

style="width:100%;">

<option ${note.priority==="Niedrig"?"selected":""}>
Niedrig
</option>

<option ${note.priority==="Mittel"?"selected":""}>
Mittel
</option>

<option ${note.priority==="Hoch"?"selected":""}>
Hoch
</option>

</select>

</div>

`;

        });

    },

    update(topicIndex,noteIndex,field,value){

        MeetingEditor.meeting
            .topics[topicIndex]
            .notes[noteIndex][field]=value;

    }

};
