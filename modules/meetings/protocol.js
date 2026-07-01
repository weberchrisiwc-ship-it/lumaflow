// =============================================
// LumaFlow
// Meeting Protocol
// Version 1.1
// =============================================

const MeetingProtocol = {

    create(meeting){

        let html = "";

        html += `

<div class="protocol">

<h1>${meeting.title}</h1>

<table class="protocol-header">

<tr>
<td><b>Datum</b></td>
<td>${meeting.date}</td>
</tr>

<tr>
<td><b>Ort</b></td>
<td>${meeting.location || "-"}</td>
</tr>

<tr>
<td><b>Teilnehmer</b></td>
<td>${meeting.participants.join(", ")}</td>
</tr>

<tr>
<td><b>Erstellt</b></td>
<td>${new Date().toLocaleString()}</td>
</tr>

</table>

<hr>

`;

        meeting.topics.forEach(topic=>{

            html += this.renderTopic(topic);

        });

        html += `</div>`;

        return html;

    },

    renderTopic(topic){

        let html = `

<h2>${topic.title}</h2>

`;

        const infos=(topic.notes||[]).filter(n=>n.type==="info");
        const decisions=(topic.notes||[]).filter(n=>n.type==="decision");
        const todos=(topic.notes||[]).filter(n=>n.type==="todo");
        const appointments=(topic.notes||[]).filter(n=>n.type==="appointment");

        if(infos.length){

            html+="<h3>ℹ Informationen</h3><ul>";

            infos.forEach(note=>{

                html+=`<li>${note.title}</li>`;

            });

            html+="</ul>";

        }

        if(decisions.length){

            html+="<h3>✔ Beschlüsse</h3><ul>";

            decisions.forEach(note=>{

                html+=`<li>${note.title}</li>`;

            });

            html+="</ul>";

        }

        if(todos.length){

            html+=`

<h3>☑ Aufgaben</h3>

<table>

<tr>

<th>Aufgabe</th>

<th>Beschreibung</th>

<th>Verantwortlich</th>

<th>Termin</th>

<th>Priorität</th>

<th>Status</th>

</tr>

`;

            todos.forEach(todo=>{

                html+=`

<tr>

<td>${todo.title}</td>

<td>${todo.description || "-"}</td>

<td>${todo.assigned || "-"}</td>

<td>${todo.due || "-"}</td>

<td>${todo.priority || "-"}</td>

<td>${todo.status || "Offen"}</td>

</tr>

`;

            });

            html+="</table>";

        }

        if(appointments.length){

            html+="<h3>📅 Termine</h3><ul>";

            appointments.forEach(note=>{

                html+=`

<li>

${note.title}

${note.due ? "- "+note.due : ""}

</li>

`;

            });

            html+="</ul>";

        }

        html+="<hr>";

        return html;

    },

    preview(){

        const html=this.create(MeetingEditor.meeting);

        const win=window.open("","_blank");

        win.document.write(`

<html>

<head>

<title>Besprechungsprotokoll</title>

<style>

body{

font-family:Segoe UI,Arial;

padding:40px;

background:white;

}

h1{

color:#2458ff;

margin-bottom:30px;

}

h2{

margin-top:35px;

border-bottom:2px solid #ddd;

padding-bottom:8px;

}

table{

width:100%;

border-collapse:collapse;

margin-bottom:20px;

}

td,th{

border:1px solid #ddd;

padding:8px;

text-align:left;

}

th{

background:#f3f3f3;

}

hr{

margin:35px 0;

}

</style>

</head>

<body>

${html}

</body>

</html>

`);

    }

};
