# Chord App

Eine kleine Web-App zum Lernen und Üben von Akkorden für Ukulele und Gitarre.

Die App zeigt Akkorddiagramme an, lässt zwischen Instrumenten wechseln und bietet eine Song-Übungsfunktion: Akkorde können markiert werden und erscheinen anschließend als schnelle Referenz nebeneinander unter dem Hauptdiagramm.

## Funktionen

- Instrument-Umschalter für Ukulele und Gitarre
- Akkordliste mit auswählbarem Hauptdiagramm
- Song-Auswahl per Checkbox
- Referenzbereich für alle Akkorde, die für einen Song benötigt werden
- Responsive Layout für Desktop und kleinere Bildschirme
- SVG-Akkorddiagramme mit `svguitar`

## Voraussetzungen

- Node.js
- npm

Empfohlen ist eine aktuelle Node.js-LTS-Version.

## Installation

Repository klonen:

```powershell
git clone <repository-url>
cd chord-app
```

Abhängigkeiten installieren:

```powershell
npm install
```

## Lokaler Betrieb

Entwicklungsserver starten:

```powershell
npm run dev
```

Danach die angezeigte lokale URL im Browser öffnen, typischerweise:

```text
http://127.0.0.1:5173/
```

Der Entwicklungsserver muss im Terminal weiterlaufen, solange die App im Browser genutzt werden soll.

## Build

Produktionsbuild erstellen:

```powershell
npm run build
```

Der Build wird in `dist/` erzeugt.

Build lokal testen:

```powershell
npm run preview
```

## Projektstruktur

```text
src/
  App.tsx                    Haupt-UI und Song-Auswahl
  App.css                    Styling der App
  components/
    ChordDiagram.tsx         SVGuitar-Wrapper für Akkorddiagramme
  data/
    chords.ts                Akkorddaten für Ukulele und Gitarre
```

## Technologien

- React
- TypeScript
- Vite
- SVGuitar

## Hinweise

Die Akkorddaten liegen aktuell statisch in `src/data/chords.ts`. Neue Akkorde können dort ergänzt werden, indem ein weiterer `ChordShape`-Eintrag hinzugefügt wird.
