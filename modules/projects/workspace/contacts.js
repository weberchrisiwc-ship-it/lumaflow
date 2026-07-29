// ==========================================
// Workspace Contacts
// ==========================================

const WorkspaceContacts = {

    render(project) {

        const container = document.getElementById("workspace-content");

        if (!container) return;

        const contacts = project.contacts || [];

        container.innerHTML = `

            <div class="workspace-module">

                <div class="module-header">

                    <h2>Kontakte</h2>

                    <button
                        class="btn btn-primary"
                        onclick="WorkspaceContacts.add()">

                        + Kontakt

                    </button>

                </div>

                ${
                    contacts.length === 0

                    ?

                    `
                        <div class="card empty-state">

                            <h3>Keine Kontakte vorhanden</h3>

                        </div>
                    `

                    :

                    `
                        <div class="card">

                            ${contacts.map(contact => `

                                <div class="list-item">

                                    👤 ${contact.name}

                                </div>

                            `).join("")}

                        </div>
                    `

                }

            </div>

        `;

    },

    add() {

        console.log("Kontakt hinzufügen");

    }

};
