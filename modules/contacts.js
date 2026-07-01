// ==============================
// LumaFlow - Kontakte
// ==============================

let contacts = JSON.parse(localStorage.getItem("lumaflow_contacts")) || [

    {
        id: crypto.randomUUID(),
        name: "Christoph Weber"
    },

    {
        id: crypto.randomUUID(),
        name: "Martin"
    },

    {
        id: crypto.randomUUID(),
        name: "Daniel"
    },

    {
        id: crypto.randomUUID(),
        name: "Sarah"
    }

];

saveContacts();

function saveContacts(){

    localStorage.setItem(
        "lumaflow_contacts",
        JSON.stringify(contacts)
    );

}

function showContacts(){

    setPage(`

<h1>👥 Kontakte</h1>

<div style="display:flex;justify-content:space-between;align-items:center;margin:25px 0;">

    <button class="btn btn-primary"
        onclick="addContact()">

        + Mitarbeiter

    </button>

</div>

<div class="card">

<table>

<thead>

<tr>

<th>Name</th>

<th width="120"></th>

</tr>

</thead>

<tbody id="contactTable"></tbody>

</table>

</div>

`);

renderContacts();

}

function renderContacts(){

const table=document.getElementById("contactTable");

table.innerHTML="";

contacts.forEach((person,index)=>{

table.innerHTML+=`

<tr>

<td>${person.name}</td>

<td>

<button
class="btn btn-danger"
onclick="deleteContact(${index})">

🗑️

</button>

</td>

</tr>

`;

});

}

function addContact(){

const name=prompt("Name");

if(!name) return;

contacts.push({

id:crypto.randomUUID(),

name:name

});

saveContacts();

showContacts();

}

function deleteContact(index){

if(!confirm("Mitarbeiter löschen?")) return;

contacts.splice(index,1);

saveContacts();

showContacts();

}