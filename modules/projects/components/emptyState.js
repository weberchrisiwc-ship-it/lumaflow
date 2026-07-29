// ==========================================
// LumaFlow
// Empty State Component
// ==========================================

const EmptyState = {

    render({
        icon = "📂",
        title = "Keine Daten vorhanden",
        message = "",
        buttonText = "",
        buttonAction = ""
    }) {

        return `

            <div class="empty-state">

                <div class="empty-state-icon">

                    ${icon}

                </div>

                <h2>

                    ${title}

                </h2>

                <p>

                    ${message}

                </p>

                ${buttonText ? `

                    <button
                        class="btn btn-primary"
                        onclick="${buttonAction}">

                        ${buttonText}

                    </button>

                ` : ""}

            </div>

        `;

    }

};
