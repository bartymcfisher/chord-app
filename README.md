# Chord App

A small web app for learning and practicing chords on ukulele and guitar.

The app displays chord diagrams, lets you switch instruments, and includes a song practice workflow: select the chords needed for a song and keep them visible as a quick reference below the main diagram.

## Features

- Ukulele and guitar chord libraries
- Open chord section grouped by root note
- Main chord diagram with selectable chord list
- Song chord selection with checkboxes
- Quick reference area for all selected song chords
- Language selector for English and German
- Theme selector for light and dark mode
- Responsive layout for desktop and smaller screens
- SVG chord diagrams powered by `svguitar`

## Requirements

- Node.js
- npm

A current Node.js LTS release is recommended.

## Installation

Clone the repository:

```powershell
git clone https://github.com/bartymcfisher/chord-app.git
cd chord-app
```

Install dependencies:

```powershell
npm install
```

## Development

Start the local development server:

```powershell
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

Keep the terminal running while using the app in the browser.

## Build

Create a production build:

```powershell
npm run build
```

The production files are generated in `dist/`.

Preview the production build locally:

```powershell
npm run preview
```

## Project Structure

```text
src/
  App.tsx                    Main UI, language/theme settings, song selection
  App.css                    App layout and component styling
  components/
    ChordDiagram.tsx         Theme-aware SVGuitar wrapper for chord diagrams
  data/
    chords.ts                Chord data for ukulele and guitar
```

## Technology

- React
- TypeScript
- Vite
- SVGuitar

## Notes

Chord data is currently stored in `src/data/chords.ts`. New chords can be added by creating another `ChordShape` entry.

The selected language is stored in a cookie. The selected theme is stored in `localStorage`.
