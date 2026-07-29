// ==========================================
// LumaFlow
// Projects Toolbar
// ==========================================

const ProjectToolbar = {

    render() {

        const container = document.getElementById("project-toolbar");

        if (!container) return;

        container.innerHTML = `

            <div class="project-toolbar">

                <div class="project-toolbar-left">

                    <input
                        id="project-search"
                        class="project-search"
                        type="text"
                        placeholder="🔍 Projekte durchsuchen..."
                        oninput="ProjectToolbar.search()">

                </div>

                <div class="project-toolbar-right">

                    <button
                        class="btn"
                        onclick="ProjectToolbar.filter()">

                        Filter

                    </button>

                    <button
                        class="btn"
                        onclick="ProjectToolbar.sort()">

                        Sortieren

                    </button>

                    <button
                        class="btn btn-primary"
                        onclick="createProject()">

                        + Neues Projekt

                    </button>

                </div>

            </div>

        `;

    },

    search() {

        const value = document
            .getElementById("project-search")
            .value
            .trim()
            .toLowerCase();

        searchProjects(value);

    },

    filter() {

        console.log("Projektfilter wird später implementiert.");

    },

    sort() {

        console.log("Projektsortierung wird später implementiert.");

    }

};
