// ==========================================
// Workspace Documents
// ==========================================

const WorkspaceDocuments = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        const documents = project.documents || [];

        container.innerHTML = `

            <div class="workspace-module">

                <div class="module-header">

                    <h2>Dokumente</h2>

                    <button
                        class="btn btn-primary"
                        onclick="WorkspaceDocuments.add()">

                        + Dokument

                    </button>

                </div>

                ${
                    documents.length === 0

                    ?

                    `
                        <div class="card empty-state">

                            <h3>Keine Dokumente vorhanden</h3>

                            <p>
                                Diesem Projekt wurden noch keine Dokumente hinzugefügt.
                            </p>

                        </div>
                    `

                    :

                    `
                        <div class="card">

                            ${documents.map(document => `

                                <div class="list-item">

                                    📄 ${document.name}

                                </div>

                            `).join("")}

                        </div>
                    `

                }

            </div>

        `;

    },

    add() {

        console.log("Dokument hinzufügen");

    }

};
