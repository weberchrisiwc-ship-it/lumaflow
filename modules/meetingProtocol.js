// ==========================================
// LumaFlow
// Meeting Protocol
// Version 0.5
// ==========================================

function createMeetingProtocol(meeting){

    const parsed = parseMeeting(meeting);

    let html = "";

    html += `
        <h2>${meeting.title}</h2>

        <p><b>Datum:</b> ${meeting.date}</p>
        <p><b>Ort:</b> ${meeting.location}</p>
        <p><b>Teilnehmer:</b> ${meeting.participants}</p>

        <hr>
    `;

    //--------------------------------------------------
    // Themen
    //--------------------------------------------------

    meeting.topics.forEach(topic=>{

        html += `
            <h3>${topic.title}</h3>
            <pre>${topic.notes}</pre>
        `;

    });

    //--------------------------------------------------
    // Aufgaben
    //--------------------------------------------------

    html += `
        <hr>
        <h3>📋 Aufgaben</h3>
    `;

    if(parsed.todos.length===0){

        html+="Keine Aufgaben.";

    }else{

        parsed.todos.forEach(todo=>{

            html+=`
                <p>☐ ${todo.text}</p>
            `;

        });

    }

    //--------------------------------------------------
    // Infos
    //--------------------------------------------------

    html += `
        <hr>
        <h3>ℹ Informationen</h3>
    `;

    if(parsed.infos.length===0){

        html+="Keine Informationen.";

    }else{

        parsed.infos.forEach(info=>{

            html+=`
                <p>• ${info.text}</p>
            `;

        });

    }

    //--------------------------------------------------
    // Beschlüsse
    //--------------------------------------------------

    html += `
        <hr>
        <h3>✔ Beschlüsse</h3>
    `;

    if(parsed.decisions.length===0){

        html+="Keine Beschlüsse.";

    }else{

        parsed.decisions.forEach(decision=>{

            html+=`
                <p>✔ ${decision.text}</p>
            `;

        });

    }

    return html;

}
