// =============================================
// LumaFlow
// app.js
// =============================================

window.onload=function(){

    applyTheme();

    showDashboard();

};

// ----------------------------

function setPage(html){

    document.getElementById("page").innerHTML=html;

}

// ----------------------------

function toggleSidebar(){

    document
        .querySelector(".sidebar")
        .classList.toggle("collapsed");

}
