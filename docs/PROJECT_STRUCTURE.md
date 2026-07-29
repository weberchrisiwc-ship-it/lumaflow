# LumaFlow – Project Structure

> Version: 0.1
> Letzte Aktualisierung: 29.07.2026

---

# Ziel

Diese Datei beschreibt die komplette Ordner- und Dateistruktur des Projekts sowie die Verantwortlichkeiten der einzelnen Bereiche.

Sie dient als Referenz für alle zukünftigen Erweiterungen.

---

# Projektübersicht

```
lumaflow/

│
├── index.html
├── app.js
├── style.css
├── logo.svg
│
├── assets/
├── docs/
├── modules/
├── styles/
├── releases/
```

---

# Root

## index.html

Startpunkt der Anwendung.

Verantwortlich für:

- Grundlayout
- Sidebar
- Topbar
- Navigation
- Content Container

Keine Geschäftslogik.

---

## app.js

Zentrale Steuerung der Anwendung.

Verantwortlich für:

- Navigation
- Routing
- Modulwechsel
- globale Initialisierung
- Eventsteuerung

---

## style.css

Globale Styles.

Enthält:

- Farben
- Typografie
- Komponenten
- Layout
- Responsive Regeln
- Animationen

---

## logo.svg

Projektlogo.

---

# assets/

Enthält sämtliche statischen Ressourcen.

Beispiele:

```
assets/

images/

icons/

fonts/

illustrations/
```

---

# docs/

Technische Dokumentation.

```
docs/

README.md

PROJECT_STRUCTURE.md

Architecture.md

CodingRules.md

ModuleOverview.md

DesignSystem.md

UI-Guidelines.md

Roadmap.md

SprintLog.md

CHANGELOG.md

DATABASE.md

STORAGE.md

CONTRIBUTING.md
```

---

# modules/

Enthält sämtliche Module der Anwendung.

Aktuelle Struktur:

```
modules/

dashboard/

projects/

tasks/

calendar/

meetings/

documents/

contacts/

projectContacts/

protocols/

settings/
```

Jedes Modul besitzt eine klar definierte Aufgabe.

Module kommunizieren ausschließlich über definierte Schnittstellen.

---

## dashboard/

Startseite der Anwendung.

Verantwortlich für:

- Übersicht
- Widgets
- Statistiken
- Quick Actions

---

## projects/

Projektverwaltung.

Verantwortlich für:

- Projekte
- Projektinformationen
- Workspace
- Status
- Fortschritt

---

## tasks/

Aufgabenverwaltung.

Verantwortlich für:

- Aufgaben
- Prioritäten
- Deadlines
- Verantwortliche

---

## calendar/

Kalender.

Verantwortlich für:

- Termine
- Deadlines
- Meetings
- Erinnerungen

---

## meetings/

Meetingverwaltung.

Verantwortlich für:

- Besprechungen
- Meetingeditor
- Teilnehmer
- Notizen
- Entscheidungen

---

## documents/

Dokumentenverwaltung.

Verantwortlich für:

- Dateien
- Anhänge
- Dokumentkategorien

---

## contacts/

Kontaktverwaltung.

Verantwortlich für:

- Personen
- Firmen
- Ansprechpartner

---

## projectContacts/

Projektbezogene Kontakte.

Verknüpfung zwischen

Projekten

und

Kontakten.

---

## protocols/

Protokolle.

Verantwortlich für:

- Meetingprotokolle
- Entscheidungen
- Aufgaben
- Export

---

## settings/

Anwendungseinstellungen.

Verantwortlich für:

- Theme
- Benutzeroptionen
- Konfiguration

---

# styles/

Enthält ausgelagerte CSS-Dateien.

Beispiel:

```
styles/

buttons.css

cards.css

forms.css

tables.css

layout.css

sidebar.css

toolbar.css
```

---

# releases/

Archiv vergangener Versionen.

Beispiel:

```
releases/

v0.4

v0.5

v0.6
```

---

# Architekturprinzip

Die Anwendung folgt einer modularen Architektur.

Jedes Modul besitzt:

- eine klar definierte Aufgabe
- eigene Funktionen
- eigene Daten
- minimale Abhängigkeiten

---

# Datenfluss

```
Benutzer

↓

UI

↓

Modul

↓

LocalStorage

↓

Rendern

↓

UI
```

---

# Benennung

Ordner

- klein geschrieben

Dateien

- camelCase

CSS

- kebab-case

JavaScript

- camelCase

---

# Erweiterungen

Neue Module werden ausschließlich im Ordner

modules/

angelegt.

Jedes Modul besitzt:

- eigene HTML-Templates (falls notwendig)
- eigene JavaScript-Dateien
- eigene Styles (falls ausgelagert)

---

# Langfristige Struktur

Geplante Module

```
modules/

workspace/

notifications/

reports/

analytics/

automation/

chat/

files/

timeline/
```

---

# Zielstruktur

LumaFlow soll langfristig aus unabhängigen, wiederverwendbaren Modulen bestehen.

Neue Funktionen werden möglichst ergänzt und nicht in bestehende Module eingebaut.

Dadurch bleibt die Anwendung:

- übersichtlich
- wartbar
- skalierbar
- leicht erweiterbar
