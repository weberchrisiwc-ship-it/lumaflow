// =============================================
// LumaFlow
// Meeting Parser
// Version 1.0
// =============================================

const MeetingParser = {

    parse(text){

        const lines = text
            .split("\n")
            .map(l => l.trim())
            .filter(l => l.length > 0);

        const result = [];

        lines.forEach(line => {

            let type = "info";

            const lower = line.toLowerCase();

            if (
                lower.includes("beschlossen") ||
                lower.includes("freigegeben") ||
                lower.includes("genehmigt")
            ) {

                type = "decision";

            }

            else if (

                lower.includes("termin") ||
                lower.includes("jour fixe") ||
                lower.includes("besprechung")

            ){

                type = "appointment";

            }

            else if (

                lower.includes("prüfen") ||
                lower.includes("pruefen") ||
                lower.includes("erstellen") ||
                lower.includes("bemustern") ||
                lower.includes("zeichnen") ||
                lower.includes("planen") ||
                lower.includes("senden") ||
                lower.includes("kontrollieren")

            ){

                type = "todo";

            }

            result.push({

                id: crypto.randomUUID(),

                type,

                title: line,

                description: "",

                assigned: "",

                due: "",

                priority: "Mittel"

            });

        });

        return result;

    }

};
