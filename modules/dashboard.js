function showDashboard() {

    setPage(`

        <h1>Dashboard</h1>

        <p>Willkommen bei LumaFlow.</p>

        <div class="cards">

            <div class="card">
                <h3>Projekte</h3>
                <h1>${projects.length}</h1>
            </div>

            <div class="card">
                <h3>Aufgaben</h3>
                <h1>0</h1>
            </div>

            <div class="card">
                <h3>Besprechungen</h3>
                <h1>0</h1>
            </div>

            <div class="card">
                <h3>Protokolle</h3>
                <h1>0</h1>
            </div>

        </div>

        <div class="card">

            <h2>Meine Projekte</h2>

            <div id="dashboardProjects"></div>

        </div>

    `);

    const list = document.getElementById("dashboardProjects");

    if (projects.length === 0) {
        list.innerHTML = "<br>Noch keine Projekte vorhanden.";
        return;
    }

    projects.forEach(project => {

        list.innerHTML += `
            <p style="margin-top:10px;">
                📁 <strong>${project.number}</strong> - ${project.name}
            </p>
        `;

    });

}