// ==========================================
// LumaFlow
// Project Dialog
// ==========================================

const ProjectDialog = {

    editingProject: null,

    open(project = null) {

        this.editingProject = project;

        const old = document.getElementById("project-dialog");

        if (old) old.remove();

        document.body.insertAdjacentHTML("beforeend", `

<div class="dialog-overlay" id="project-dialog">

    <div class="dialog">

        <div class="dialog-header">

            <h2>

                ${project ? "Projekt bearbeiten" : "Neues Projekt"}

            </h2>

        </div>

        <div class="dialog-content">

            <label>Projektnummer</label>

            <input
                id="dialog-project-number"
                value="${project?.number || ""}">

            <label>Projektname *</label>

            <input
                id="dialog-project-name"
                value="${project?.name || ""}">

            <label>Kunde</label>

            <input
                id="dialog-project-customer"
                value="${project?.customer || ""}">

            <label>Status</label>

            <select id="dialog-project-status">

                <option ${project?.status==="Planung"?"selected":""}>Planung</option>

                <option ${project?.status==="Angebot"?"selected":""}>Angebot</option>

                <option ${project?.status==="Ausschreibung"?"selected":""}>Ausschreibung</option>

                <option ${project?.status==="Ausführung"?"selected":""}>Ausführung</option>

                <option ${project?.status==="Abnahme"?"selected":""}>Abnahme</option>

                <option ${project?.status==="Abgeschlossen"?"selected":""}>Abgeschlossen</option>

            </select>

        </div>

        <div class="dialog-footer">

            <button
                class="btn"
                onclick="ProjectDialog.close()">

                Abbrechen

            </button>

            <button
                class="btn btn-primary"
                onclick="ProjectDialog.save()">

                Speichern

            </button>

        </div>

    </div>

</div>

`);

    },

    close() {

        document
            .getElementById("project-dialog")
            ?.remove();

    },

    save() {

        const data = {

            id: this.editingProject?.id,

            number: document.getElementById("dialog-project-number").value,

            name: document.getElementById("dialog-project-name").value,

            customer: document.getElementById("dialog-project-customer").value,

            status: document.getElementById("dialog-project-status").value

        };

        if (data.name.trim() === "") {

            alert("Bitte einen Projektnamen eingeben.");

            return;

        }

        saveProject(data);

    }

};
