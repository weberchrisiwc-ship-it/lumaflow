# LumaFlow – Architecture

> Version: 0.1
> Letzte Aktualisierung: 29.07.2026

---

# Projektziel

LumaFlow ist eine moderne webbasierte Projekt- und Meetingmanagement-Anwendung.

Der Fokus liegt auf einer schnellen Bedienung, einer klaren Benutzeroberfläche und einer modularen Architektur.

Langfristig soll LumaFlow eine vollständige Lösung für Projektmanagement, Aufgabenverwaltung, Meetings, Dokumentation und Zusammenarbeit werden.

---

# Technologie

Frontend

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

Datenspeicherung

- LocalStorage

Icons

- Font Awesome

Deployment

- GitHub
- GitHub Pages / Netlify (optional)

---

# Architekturprinzip

LumaFlow basiert auf einer modularen Architektur.

Jedes Modul besitzt eine klar definierte Aufgabe.

Module dürfen möglichst unabhängig voneinander funktionieren.

Die Kommunikation erfolgt ausschließlich über definierte Schnittstellen.

---

# Projektstruktur

index.html

↓

app.js

↓

Module

↓

LocalStorage

---

# Hauptkomponenten

## index.html

Verantwortlich für:

- Grundlayout
- Sidebar
- Topbar
- Navigation
- Content Container

Keine Geschäftslogik.

---

## app.js

Verantwortlich für:

- Navigation
- Routing
- Seitenwechsel
- globale Funktionen
- Initialisierung

app.js ist die zentrale Steuerung der Anwendung.

---

## style.css

Enthält ausschließlich:

- Layout
- Komponenten
- Farben
- Animationen
- Responsive Design

Keine JavaScript-Abhängigkeiten.

---

# Module

Jedes Modul besitzt genau eine Hauptaufgabe.

Aktuelle Module:

- Dashboard
- Projects
- Tasks
- Calendar
- Meetings
- Documents
- Contacts
- Project Contacts
- Protocols
- Settings

---

# Standardaufbau eines Moduls

Ein Modul soll möglichst nach diesem Aufbau organisiert werden.

- show()
- render()
- save()
- update()
- delete()

Interne Hilfsfunktionen bleiben privat.

---

# Datenfluss

Benutzer

↓

UI

↓

Modul

↓

LocalStorage

↓

UI aktualisieren

Module greifen niemals direkt auf andere Module zu.

---

# Navigation

Die Navigation erfolgt ausschließlich über app.js.

Keine direkte Navigation zwischen Modulen.

---

# State Management

Aktuell

LocalStorage

Später möglich

- IndexedDB
- API
- Cloud Sync

Die Modulstruktur soll einen späteren Wechsel ermöglichen.

---

# Designprinzipien

LumaFlow orientiert sich an modernen Business-Anwendungen.

Inspiration:

- Autodesk Construction Cloud
- Microsoft Planner
- Linear
- Notion

Ziele:

- viel Weißraum
- klare Hierarchie
- wenige Farben
- schnelle Bedienung
- Desktop First

---

# UI Prinzipien

Jede Seite folgt möglichst diesem Aufbau.

Topbar

↓

Toolbar

↓

Filter

↓

Content

↓

Aktionen

---

# Farbprinzip

Farben besitzen immer eine Bedeutung.

Blau

Information

Grün

Erfolgreich

Gelb

Warnung

Rot

Fehler

Grau

Neutral

---

# Komponenten

Wiederverwendbare Komponenten:

- Cards
- Buttons
- Badges
- Tabellen
- Formulare
- Dialoge
- Dropdowns
- Suchfelder

Neue Komponenten sollen möglichst generisch entwickelt werden.

---

# Coding Prinzipien

- Keine doppelten Funktionen
- Keine mehrfachen HTML-Templates
- Keine Inline-CSS
- Keine globalen Variablen
- Funktionen möglichst klein halten
- Wiederverwendbare Komponenten bevorzugen

---

# Performance

Ziele

- schneller Seitenwechsel
- wenige DOM-Updates
- Wiederverwendung von Komponenten
- keine unnötigen Renderzyklen

---

# Erweiterbarkeit

Neue Module sollen sich ohne Änderungen an bestehenden Modulen integrieren lassen.

Neue Funktionen werden bevorzugt als eigenständiges Modul entwickelt.

---

# Langfristige Ziele

- Workspace pro Projekt
- Dokumentenverwaltung
- Meeting-Editor
- Aufgabenverwaltung
- Kalenderintegration
- Benachrichtigungen
- Mehrbenutzerfähigkeit
- Cloud-Synchronisation

---

# Architekturregeln

Diese Regeln gelten für das gesamte Projekt.

✔ Modular entwickeln

✔ Komponenten wiederverwenden

✔ Geschäftslogik von Darstellung trennen

✔ Einheitliches Design

✔ Dokumentation aktuell halten

✔ Jede größere Änderung dokumentieren

✔ Änderungen im SprintLog festhalten

✔ CHANGELOG aktuell halten

---

# Zukunft

Diese Architektur soll langfristig wachsen, ohne dass bestehender Code vollständig umgebaut werden muss.

Neue Module sollen sich nahtlos integrieren und denselben Architekturprinzipien folgen.
