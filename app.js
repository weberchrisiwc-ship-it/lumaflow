window.onload = function () {
    showDashboard();
};

function setPage(html) {
    document.getElementById("page").innerHTML = html;
}

function showTasks() {

    setPage(`
        <h1>Aufgaben</h1>

        <div class="card">

            Modul folgt.

        </div>
    `);

}

function showMeetings() {

    setPage(`
        <h1>Besprechungen</h1>

        <div class="card">

            Modul folgt.

        </div>
    `);

}

function showProtocols() {

    setPage(`
        <h1>Protokolle</h1>

        <div class="card">

            Modul folgt.

        </div>
    `);

}

function showContacts() {

    setPage(`
        <h1>Kontakte</h1>

        <div class="card">

            Modul folgt.

        </div>
    `);

}