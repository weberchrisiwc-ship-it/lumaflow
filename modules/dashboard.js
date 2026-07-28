// =============================================
// LumaFlow Dashboard 6.0
// PART 1 / 4
// =============================================

function showDashboard() {

    const stats = calculateDashboardStats();

    const greeting = getDashboardGreeting();

    setPage(`

<div class="dashboard">

    ${renderWelcomeCard(greeting, stats)}

    ${renderStatsCards(stats)}

    <div class="dashboard-grid">

        <div id="dashboardToday"></div>

        <div id="dashboardProjects"></div>

    </div>

    <div class="dashboard-grid">

        <div id="dashboardQuickActions"></div>

        <div id="dashboardActivity"></div>

    </div>

</div>

`);

    renderDashboardToday(stats.today);

    renderDashboardProjects();

    renderDashboardQuickActions();

    renderDashboardActivity();

}



// =============================================
// Dashboard Statistiken
// =============================================

function calculateDashboardStats() {

    const today = new Date()
        .toISOString()
        .substring(0, 10);

    const stats = {

        today,

        totalProjects: projects.length,

        totalTasks: 0,

        openTasks: 0,

        completedTasks: 0,

        totalMeetings: 0,

        totalProtocols: 0

    };

    projects.forEach(project => {

        stats.totalMeetings += project.meetings.length;

        stats.totalProtocols += project.protocols.length;

        stats.totalTasks += project.tasks.length;

        project.tasks.forEach(task => {

            if (task.status === "Erledigt") {

                stats.completedTasks++;

            } else {

                stats.openTasks++;

            }

        });

    });

    return stats;

}



// =============================================
// Begrüßung
// =============================================

function getDashboardGreeting() {

    const hour = new Date().getHours();

    if (hour < 11)
        return "Guten Morgen";

    if (hour < 17)
        return "Guten Tag";

    return "Guten Abend";

}



// =============================================
// Welcome Card
// =============================================

function renderWelcomeCard(greeting, stats) {

    return `

<div class="info-card">

    <h2>${greeting}</h2>

    <p>

        Willkommen bei <b>LumaFlow</b>.

        Aktuell verwaltest du

        <b>${stats.totalProjects}</b> Projekte,

        <b>${stats.openTasks}</b> offene Aufgaben

        und

        <b>${stats.totalMeetings}</b> Meetings.

    </p>

</div>

`;

}



// =============================================
// Statistik-Karten
// =============================================

function renderStatsCards(stats) {

    return `

<div class="dashboard-grid">

    ${createStatCard(

        "Projekte",

        stats.totalProjects,

        "fa-folder"

    )}

    ${createStatCard(

        "Aufgaben",

        stats.openTasks,

        "fa-list-check"

    )}

    ${createStatCard(

        "Meetings",

        stats.totalMeetings,

        "fa-calendar-days"

    )}

    ${createStatCard(

        "Protokolle",

        stats.totalProtocols,

        "fa-file-lines"

    )}

</div>

`;

}



// =============================================
// Einzelne Statistik-Karte
// =============================================

function createStatCard(title, value, icon) {

    return `

<div class="stat-card">

    <div class="stat-header">

        <div>

            <div class="stat-title">

                ${title}

            </div>

            <div class="stat-value">

                ${value}

            </div>

        </div>

        <div class="stat-icon">

            <i class="fa-solid ${icon}"></i>

        </div>

    </div>

</div>

`;

}
// =============================================
// Dashboard Heute
// =============================================

function renderDashboardToday(today) {

    const container =
        document.getElementById("dashboardToday");

    if (!container) return;

    const items = [];

    projects.forEach(project => {

        project.tasks.forEach(task => {

            if (task.date === today) {

                items.push({
                    type: "task",
                    title: task.title,
                    subtitle: project.number,
                    status: task.status
                });

            }

        });

        project.meetings.forEach(meeting => {

            if (meeting.date === today) {

                items.push({
                    type: "meeting",
                    title: meeting.title,
                    subtitle: project.number,
                    time: meeting.time || ""
                });

            }

        });

    });

    let html = `

<div class="project-card">

    <div class="section-header">

        <div>

            <h2>Heute</h2>

            <p>${items.length} Einträge</p>

        </div>

    </div>

`;

    if (items.length === 0) {

        html += `

<div class="empty-state">

    <i class="fa-regular fa-calendar-check"></i>

    <h3>Keine Termine</h3>

    <p>

        Für heute stehen keine Aufgaben oder Meetings an.

    </p>

</div>

`;

    } else {

        items.forEach(item => {

            html += renderTodayItem(item);

        });

    }

    html += `

</div>

`;

    container.innerHTML = html;

}



// =============================================
// Eintrag Heute
// =============================================

function renderTodayItem(item) {

    const icon =
        item.type === "task"
            ? "fa-list-check"
            : "fa-calendar-days";

    const badge =
        item.type === "task"
            ? "badge-primary"
            : "badge-success";

    return `

<div class="project-footer">

    <div style="display:flex;align-items:center;gap:14px;">

        <div class="stat-icon">

            <i class="fa-solid ${icon}"></i>

        </div>

        <div>

            <div style="font-weight:600;">

                ${item.title}

            </div>

            <div class="stat-subtitle">

                ${item.subtitle}

            </div>

        </div>

    </div>

    <span class="badge ${badge}">

        ${item.type === "task"
            ? "Aufgabe"
            : "Meeting"}

    </span>

</div>

`;

}
// =============================================
// Dashboard Projekte
// =============================================

function renderDashboardProjects() {

    const container =
        document.getElementById("dashboardProjects");

    if (!container) return;

    if (projects.length === 0) {

        container.innerHTML = `

<div class="project-card">

    <div class="empty-state">

        <i class="fa-regular fa-folder-open"></i>

        <h3>Keine Projekte vorhanden</h3>

        <p>

            Erstelle dein erstes Projekt.

        </p>

    </div>

</div>

`;

        return;

    }

    let html = `

<div class="project-card">

    <div class="section-header">

        <div>

            <h2>Aktive Projekte</h2>

            <p>${projects.length} Projekte</p>

        </div>

    </div>

`;

    projects.forEach((project, index) => {

        const totalTasks = project.tasks.length;

        const openTasks =
            project.tasks.filter(
                t => t.status !== "Erledigt"
            ).length;

        const progress =
            totalTasks === 0
                ? 0
                : Math.round(
                    ((totalTasks - openTasks) / totalTasks) * 100
                );

        html += renderProjectCard(
            project,
            progress,
            openTasks,
            index
        );

    });

    html += `

</div>

`;

    container.innerHTML = html;

}



// =============================================
// Projektkarte
// =============================================

function renderProjectCard(
    project,
    progress,
    openTasks,
    index
) {

    return `

<div style="margin-bottom:28px;">

    <div class="project-title">

        ${project.number}

    </div>

    <div class="project-customer">

        ${project.name}

    </div>

    <div class="progress">

        <div
            class="progress-bar"
            style="width:${progress}%">

        </div>

    </div>

    <div class="project-footer">

        <span>

            ${progress}% abgeschlossen

        </span>

        <span>

            ${openTasks} offen

        </span>

    </div>

    <button
        class="btn btn-primary"
        style="margin-top:16px;width:100%;"
        onclick="openProject(${index})">

        <i class="fa-solid fa-arrow-right"></i>

        Projekt öffnen

    </button>

</div>

`;

}



// =============================================
// Dashboard Quick Actions
// =============================================

function renderDashboardQuickActions() {

    const container =
        document.getElementById(
            "dashboardQuickActions"
        );

    if (!container) return;

    container.innerHTML = `

<div class="project-card">

    <div class="section-header">

        <div>

            <h2>Schnellaktionen</h2>

            <p>Direkter Zugriff</p>

        </div>

    </div>

    <div class="quick-actions">

        ${quickAction(
            "fa-folder-plus",
            "Projekt",
            "Neues Projekt",
            "showProjects()"
        )}

        ${quickAction(
            "fa-list-check",
            "Aufgabe",
            "Neue Aufgabe",
            "showTasks()"
        )}

        ${quickAction(
            "fa-calendar-plus",
            "Meeting",
            "Neues Meeting",
            "showMeetings()"
        )}

        ${quickAction(
            "fa-address-book",
            "Kontakt",
            "Kontakte",
            "showContacts()"
        )}

    </div>

</div>

`;

}



// =============================================
// Einzelne Schnellaktion
// =============================================

function quickAction(
    icon,
    title,
    text,
    action
) {

    return `

<div
    class="quick-card"
    onclick="${action}">

    <i class="fa-solid ${icon}"></i>

    <h3>

        ${title}

    </h3>

    <p>

        ${text}

    </p>

</div>

`;

}
// =============================================
// Dashboard Aktivitäten
// =============================================

function renderDashboardActivity() {

    const container =
        document.getElementById("dashboardActivity");

    if (!container) return;

    const activities = [];

    projects.forEach(project => {

        project.tasks.forEach(task => {

            activities.push({
                type: "task",
                icon: "fa-list-check",
                title: task.title,
                subtitle: project.number,
                date: task.date || ""
            });

        });

        project.meetings.forEach(meeting => {

            activities.push({
                type: "meeting",
                icon: "fa-calendar-days",
                title: meeting.title,
                subtitle: project.number,
                date: meeting.date || ""
            });

        });

    });

    activities.sort((a, b) => {

        return (b.date || "").localeCompare(a.date || "");

    });

    const latest = activities.slice(0, 6);

    let html = `

<div class="project-card">

    <div class="section-header">

        <div>

            <h2>Letzte Aktivitäten</h2>

            <p>${latest.length} Einträge</p>

        </div>

    </div>

`;

    if (latest.length === 0) {

        html += `

<div class="empty-state">

    <i class="fa-regular fa-clock"></i>

    <h3>Noch keine Aktivitäten</h3>

    <p>

        Sobald Projekte, Aufgaben oder Meetings
        erstellt werden, erscheinen sie hier.

    </p>

</div>

`;

    } else {

        latest.forEach(activity => {

            html += createActivityItem(activity);

        });

    }

    html += `

</div>

`;

    container.innerHTML = html;

}



// =============================================
// Aktivität
// =============================================

function createActivityItem(activity) {

    return `

<div class="project-footer">

    <div style="display:flex;align-items:center;gap:14px;">

        <div class="stat-icon">

            <i class="fa-solid ${activity.icon}"></i>

        </div>

        <div>

            <div style="font-weight:600;">

                ${activity.title}

            </div>

            <div class="stat-subtitle">

                ${activity.subtitle}

            </div>

        </div>

    </div>

</div>

`;

}



// =============================================
// Dashboard aktualisieren
// =============================================

function refreshDashboard() {

    showDashboard();

}
