# LumaFlow – Coding Rules

> Diese Regeln gelten für das gesamte Projekt.

---

# Allgemein

Das Projekt basiert auf einer modularen Architektur.

Jedes Modul besitzt genau eine Aufgabe.

Code soll einfach lesbar und wartbar sein.

---

# JavaScript

- ES6 verwenden
- const vor let
- var niemals verwenden
- camelCase verwenden
- Aussagekräftige Variablennamen
- Keine globalen Variablen

---

# Funktionen

Funktionen sollen:

- klein
- verständlich
- wiederverwendbar

sein.

Eine Funktion erledigt möglichst nur eine Aufgabe.

---

# Module

Jedes Modul besitzt eine öffentliche Einstiegsmethode.

Beispiel

showProjects()

Interne Hilfsfunktionen bleiben privat.

---

# HTML

HTML möglichst nicht mehrfach schreiben.

Templates wiederverwenden.

Keine Inline Styles.

---

# CSS

Nur CSS Variablen verwenden.

Keine festen Farben im Code.

Komponenten wiederverwenden.

Desktop First.

---

# Icons

Nur Font Awesome verwenden.

Keine unterschiedlichen Iconbibliotheken mischen.

---

# Farben

Alle Farben stammen ausschließlich aus style.css.

Keine Hexwerte im JavaScript.

---

# Kommentare

Kommentare erklären das Warum.

Nicht das Offensichtliche.

---

# localStorage

Jedes Modul verwaltet nur seine eigenen Daten.

Keine fremden Storage Keys verändern.

---

# Dateinamen

Kleinbuchstaben

camelCase

Keine Leerzeichen

---

# Neue Module

Neue Module benötigen mindestens:

- show()
- render()
- save()

falls erforderlich zusätzlich:

- update()
- delete()

---

# Dokumentation

Jede größere Änderung wird dokumentiert.

Architecture.md

ModuleOverview.md

SprintLog.md

CHANGELOG.md

werden aktuell gehalten.

---

# Qualität

Vor jedem Commit prüfen:

✔ Funktioniert alles?

✔ Keine doppelten Funktionen?

✔ Keine unnötigen Variablen?

✔ Keine Konsolenfehler?

✔ Einheitliches Design?

✔ Dokumentation aktualisiert?
