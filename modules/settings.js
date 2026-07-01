// =============================================
// LumaFlow
// Einstellungen
// =============================================

let settings = JSON.parse(
    localStorage.getItem("lumaflow_settings")
) || {

    theme: "light",

    accent: "#2450d3",

    compact: false,

    animations: true,

    company: "LumaFlow"

};

saveSettings();

function saveSettings(){

    localStorage.setItem(
        "lumaflow_settings",
        JSON.stringify(settings)
    );

    applyTheme();

}

function showSettings(){

    setPage(`

<h1>⚙️ Einstellungen</h1>

<div class="card">

<h2>🎨 Darstellung</h2>

<br>

<label>Design</label>

<select
id="themeSelect"
onchange="changeTheme(this.value)">

<option value="light"
${settings.theme==="light"?"selected":""}>

Hell

</option>

<option value="dark"
${settings.theme==="dark"?"selected":""}>

Dunkel

</option>

</select>

<br><br>

<label>Akzentfarbe</label>

<input

type="color"

value="${settings.accent}"

oninput="changeAccent(this.value)">

<br><br>

<label>

<input

type="checkbox"

${settings.compact?"checked":""}

onchange="toggleCompact(this.checked)">

Kompakte Ansicht

</label>

<br><br>

<label>

<input

type="checkbox"

${settings.animations?"checked":""}

onchange="toggleAnimations(this.checked)">

Animationen

</label>

</div>

<div class="card">

<h2>🏢 Firma</h2>

<br>

<input

id="companyName"

value="${settings.company}"

placeholder="Firmenname">

<br><br>

<button
class="btn btn-primary"
onclick="saveCompany()">

Speichern

</button>

</div>

`);

}
// =============================================
// Einstellungen Funktionen
// =============================================

function changeTheme(theme){

    settings.theme = theme;

    saveSettings();

}

function changeAccent(color){

    settings.accent = color;

    saveSettings();

}

function toggleCompact(value){

    settings.compact = value;

    saveSettings();

}

function toggleAnimations(value){

    settings.animations = value;

    saveSettings();

}

function saveCompany(){

    settings.company =
        document.getElementById("companyName").value;

    saveSettings();

    alert("Einstellungen gespeichert.");

}

// =============================================
// Theme anwenden
// =============================================

function applyTheme(){

    document.documentElement.style.setProperty(
        "--accent",
        settings.accent
    );

    if(settings.theme==="dark"){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

    if(settings.compact){

        document.body.classList.add("compact");

    }else{

        document.body.classList.remove("compact");

    }

    if(settings.animations){

        document.body.classList.remove("no-animations");

    }else{

        document.body.classList.add("no-animations");

    }

}

// =============================================
// Beim Start laden
// =============================================

applyTheme();
