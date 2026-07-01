// ==========================================
// LumaFlow
// Meeting Parser
// Version 0.5
// ==========================================

function parseMeeting(meeting){

    const result = {

        infos: [],
        todos: [],
        decisions: []

    };

    meeting.topics.forEach(topic=>{

        const lines = topic.notes.split("\n");

        lines.forEach(line=>{

            line = line.trim();

            if(line==="") return;

            //------------------------------------------------
            // TODO:
            //------------------------------------------------

            if(line.startsWith("TODO:")){

                result.todos.push({

                    topic:topic.title,

                    text:line.replace("TODO:","").trim()

                });

                return;

            }

            //------------------------------------------------
            // INFO:
            //------------------------------------------------

            if(line.startsWith("INFO:")){

                result.infos.push({

                    topic:topic.title,

                    text:line.replace("INFO:","").trim()

                });

                return;

            }

            //------------------------------------------------
            // BESCHLUSS:
            //------------------------------------------------

            if(line.startsWith("BESCHLUSS:")){

                result.decisions.push({

                    topic:topic.title,

                    text:line.replace("BESCHLUSS:","").trim()

                });

                return;

            }

        });

    });

    return result;

}
