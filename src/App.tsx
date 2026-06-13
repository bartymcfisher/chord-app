import { useMemo, useState } from 'react'
import './App.css'

import { ChordDiagram } from './components/ChordDiagram'
import { chords, type Instrument } from './data/chords'

const instruments: { id: Instrument; label: string }[] = [
  { id: 'ukulele', label: 'Ukulele' },
  { id: 'guitar', label: 'Gitarre' },
]

function App() {
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument>('ukulele')
  const [songChordIds, setSongChordIds] = useState<string[]>([])
  const visibleChords = useMemo(
    () => chords.filter((chord) => chord.instrument === selectedInstrument),
    [selectedInstrument],
  )
  const [selectedChordId, setSelectedChordId] = useState(visibleChords[0].id)

  const selectedChord =
    visibleChords.find((chord) => chord.id === selectedChordId) ??
    visibleChords[0]

  function selectInstrument(instrument: Instrument) {
    setSelectedInstrument(instrument)
    setSongChordIds([])
    setSelectedChordId(
      chords.find((chord) => chord.instrument === instrument)?.id ?? '',
    )
  }

  function toggleSongChord(chordId: string) {
    setSongChordIds((currentChordIds) =>
      currentChordIds.includes(chordId)
        ? currentChordIds.filter((currentChordId) => currentChordId !== chordId)
        : [...currentChordIds, chordId],
    )
  }

  const songChords = visibleChords.filter((chord) =>
    songChordIds.includes(chord.id),
  )

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Chord App</p>
          <h1>Akkorde lernen</h1>
        </div>

        <div className="instrument-switcher" aria-label="Instrument wechseln">
          {instruments.map((instrument) => (
            <button
              key={instrument.id}
              type="button"
              className={instrument.id === selectedInstrument ? 'active' : ''}
              onClick={() => selectInstrument(instrument.id)}
            >
              {instrument.label}
            </button>
          ))}
        </div>
      </header>

      <section className="content-layout">
        <aside className="chord-list" aria-label="Akkorde">
          <div className="panel-heading">
            <h2>{selectedInstrument === 'ukulele' ? 'Ukulele' : 'Gitarre'}</h2>
            <span>{songChords.length} im Song</span>
          </div>
          <div className="chord-buttons" aria-label="Akkorde anzeigen">
            {visibleChords.map((chord) => (
              <div
                key={chord.id}
                className={`chord-picker ${
                  chord.id === selectedChord.id ? 'active' : ''
                } ${songChordIds.includes(chord.id) ? 'marked' : ''}`}
              >
                <button type="button" onClick={() => setSelectedChordId(chord.id)}>
                  {chord.name}
                </button>
                <label>
                  <input
                    type="checkbox"
                    checked={songChordIds.includes(chord.id)}
                    onChange={() => toggleSongChord(chord.id)}
                  />
                  Song
                </label>
              </div>
            ))}
          </div>
        </aside>

        <section className="diagram-panel" aria-live="polite">
          <div className="selected-chord">
            <span>Auswahl</span>
            <strong>{selectedChord.name}</strong>
          </div>
          <ChordDiagram chord={selectedChord} />
        </section>
      </section>

      <section className="song-reference" aria-label="Song-Akkorde">
        <div className="reference-heading">
          <div>
            <p className="eyebrow">Song üben</p>
            <h2>Schnelle Referenz</h2>
          </div>
          {songChords.length > 0 && (
            <button type="button" onClick={() => setSongChordIds([])}>
              Auswahl leeren
            </button>
          )}
        </div>

        {songChords.length === 0 ? (
          <p className="empty-reference">
            Markiere links die Akkorde, die du für den Song brauchst.
          </p>
        ) : (
          <div className="reference-row">
            {songChords.map((chord) => (
              <div className="reference-chord" key={chord.id}>
                <ChordDiagram chord={chord} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
