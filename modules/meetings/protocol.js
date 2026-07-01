// =============================================
// LumaFlow
// Meeting Protocol
// Version 1.0
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
                    <td>${meeting.location}</td>
                </tr>

                <tr>
                    <td><b>Teilnehmer</b></td>
                    <td>${meeting.participants.join(", ")}</td>
                </tr>

            </table>

            <br>
        `;

        meeting.topics.forEach(topic=>{

            html += this.renderTopic(topic);

        });

        html += `</div>`;

        return html;

    },

    renderTopic(topic){

        let html = `

        <div class="protocol-topic">

            <h2>${topic.title}</h2>

        `;

        //----------------------------------
        // Informationen
        //----------------------------------

        const infos =
            topic.notes.filter(n=>n.type==="info");

        if(infos.length){

            html += "<h3>ℹ Informationen</h3><ul>";

            infos.forEach(note=>{

                html += `<li>${note.title}</li>`;

            });

            html += "</ul>";

        }

        //----------------------------------
        // Beschlüsse
        //----------------------------------

        const decisions =
            topic.notes.filter(n=>n.type==="decision");

        if(decisions.length){

            html += "<h3>✔ Beschlüsse</h3><ul>";

            decisions.forEach(note=>{

                html += `<li>${note.title}</li>`;

            });

            html += "</ul>";

        }

        //----------------------------------
        // Aufgaben
        //----------------------------------

        const todos =
            topic.notes.filter(n=>n.type==="todo");

        if(todos.length){

            html += `

            <h3>☑ Aufgaben</h3>

            <table class="protocol-table">

                <tr>

                    <th>Aufgabe</th>

                    <th>Verantwortlich</th>

                    <th>Termin</th>

                    <th>Priorität</th>

                </tr>

            `;

            todos.forEach(todo=>{

                html += `

                <tr>

                    <td>${todo.title}</td>

                    <td>${todo.assigned}</td>

                    <td>${todo.due}</td>

                    <td>${todo.priority}</td>

                </tr>

                `;

            });

            html += "</table>";

        }

        //----------------------------------
        // Termine
        //----------------------------------

        const appointments =
            topic.notes.filter(n=>n.type==="appointment");

        if(appointments.length){

            html += "<h3>📅 Termine</h3><ul>";

            appointments.forEach(note=>{

                html += `

                <li>

                    ${note.title}

                    ${note.due}

                </li>

                `;

            });

            html += "</ul>";

        }

        html += `

        <hr>

        </div>

        `;

        return html;

    },

    preview(){

        const html =
            this.create(MeetingEditor.meeting);

        const win =
            window.open("", "_blank");

        win.document.write(`

        <html>

        <head>

        <title>Protokoll</title>

        <style>

        body{

            font-family:Segoe UI,Arial;

            padding:40px;

            background:white;

        }

        h1{

            color:#2c5cff;

        }

        table{

            border-collapse:collapse;

            width:100%;

        }

        td,th{

            border:1px solid #ddd;

            padding:8px;

        }

        h2{

            margin-top:40px;

            border-bottom:2px solid #ddd;

            padding-bottom:10px;

        }

        h3{

            margin-top:25px;

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
