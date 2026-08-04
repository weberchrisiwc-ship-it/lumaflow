// ==========================================
// LumaFlow
// Project Card V3
// ==========================================

const ProjectCard = {

    render(project) {

        const totalTasks = project.tasks?.length || 0;

        const openTasks = (project.tasks || []).filter(task =>
            task.status !== "Erledigt"
        ).length;

        const progress = totalTasks === 0
            ? 0
            : Math.round(((totalTasks - openTasks) / totalTasks) * 100);

        const nextMeeting = (project.meetings || [])[0];

        const statusColor = {

            "Planung":"#94a3b8",
            "Angebot":"#f59e0b",
            "Ausschreibung":"#f97316",
            "Ausführung":"#2563eb",
            "Abnahme":"#10b981",
            "Abgeschlossen":"#6b7280"

        };

        return `

<div class="project-card">

<div class="project-status-line"

style="background:${statusColor[project.status] || "#2563eb"}">

</div>

<div class="project-card-header">

<div>

<h2>

🏢 ${project.name}

</h2>

<div class="project-number">

${project.number}

</div>

</div>

<div class="project-badge">

${project.status}

</div>

</div>

<div class="project-customer">

👤 ${project.customer || "Kein Kunde"}

</div>

<div class="project-progress">

<div class="project-progress-title">

<span>Projektfortschritt</span>

<strong>${progress}%</strong>

</div>

<div class="project-progress-bar">

<div

class="project-progress-fill"

style="width:${progress}%">

</div>

</div>

</div>

<div class="project-mini-stats">

<div>

🔥

<strong>${openTasks}</strong>

<span>Aufgaben</span>

</div>

<div>

📅

<strong>${project.meetings.length}</strong>

<span>Meetings</span>

</div>

<div>

📄

<strong>${project.documents.length}</strong>

<span>Dokumente</span>

</div>

<div>

👥

<strong>${project.contacts.length}</strong>

<span>Kontakte</span>

</div>

</div>

<div class="project-next">

<div class="title">

📅 Nächster Termin

</div>

<div>

${nextMeeting
? nextMeeting.title + "<br>" + nextMeeting.date
: "Noch kein Termin geplant"}

</div>

</div>

<div class="project-footer">

<button

class="btn btn-primary"

onclick="openProject('${project.id}')">

Projekt öffnen

</button>

<button

class="btn"

onclick="editProject('${project.id}')">

✏️

</button>

</div>

</div>

`;

    }

};
