// ==========================================
// LumaFlow
// Meeting Storage
// Version 0.5
// ==========================================

function saveMeetingResults(projectId, meeting){

    const parsed = parseMeeting(meeting);

    const project = projects.find(p => p.id === projectId);

    //--------------------------------------------------
    // Aufgaben erzeugen
    //--------------------------------------------------

    parsed.todos.forEach(todo => {

        if(!project.tasks)
            project.tasks = [];

        project.tasks.push({

            id: crypto.randomUUID(),

            title: todo.text,

            description: "",

            assigned: "",

            due: "",

            status: "Offen",

            meeting: meeting.title,

            topic: todo.topic

        });

    });

    //--------------------------------------------------
    // Infos speichern
    //--------------------------------------------------

    if(!project.infos)
        project.infos = [];

    parsed.infos.forEach(info => {

        project.infos.push(info);

    });

    //--------------------------------------------------
    // Beschlüsse speichern
    //--------------------------------------------------

    if(!project.decisions)
        project.decisions = [];

    parsed.decisions.forEach(decision => {

        project.decisions.push(decision);

    });

    saveProjects();

}
