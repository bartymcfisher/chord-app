import { useEffect, useMemo, useState } from 'react'
import './App.css'

import { ChordDiagram } from './components/ChordDiagram'
import { chords, type Instrument } from './data/chords'

type Language = 'en' | 'de'
type Theme = 'light' | 'dark'

const languageCookieName = 'chord-app-language'
const themeStorageKey = 'chord-app-theme'

const instruments: { id: Instrument; label: string }[] = [
  { id: 'ukulele', label: 'Ukulele' },
  { id: 'guitar', label: 'Guitar' },
]

const translations = {
  en: {
    appName: 'Chord App',
    title: 'Practice chords',
    instrumentLabel: 'Change instrument',
    chordListLabel: 'Chords',
    chordButtonsLabel: 'Show chords',
    guitar: 'Guitar',
    selected: 'Selected',
    inSong: 'in song',
    song: 'Song',
    songPractice: 'Song practice',
    quickReference: 'Quick reference',
    clearSelection: 'Clear selection',
    emptyReference: 'Mark the chords you need for a song on the left.',
    songReferenceLabel: 'Song chords',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
  },
  de: {
    appName: 'Akkord App',
    title: 'Akkorde üben',
    instrumentLabel: 'Instrument wechseln',
    chordListLabel: 'Akkorde',
    chordButtonsLabel: 'Akkorde anzeigen',
    guitar: 'Gitarre',
    selected: 'Auswahl',
    inSong: 'im Song',
    song: 'Song',
    songPractice: 'Song üben',
    quickReference: 'Schnelle Referenz',
    clearSelection: 'Auswahl leeren',
    emptyReference:
      'Markiere links die Akkorde, die du für den Song brauchst.',
    songReferenceLabel: 'Song-Akkorde',
    language: 'Sprache',
    theme: 'Design',
    light: 'Hell',
    dark: 'Dunkel',
  },
} satisfies Record<Language, Record<string, string>>

function readLanguageCookie(): Language {
  const language = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${languageCookieName}=`))
    ?.split('=')[1]

  return language === 'de' ? 'de' : 'en'
}

function saveLanguageCookie(language: Language) {
  document.cookie = `${languageCookieName}=${language}; path=/; max-age=31536000; SameSite=Lax`
}

function readStoredTheme(): Theme {
  return localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light'
}

function App() {
  const [language, setLanguage] = useState<Language>(readLanguageCookie)
  const [theme, setTheme] = useState<Theme>(readStoredTheme)
  const [selectedInstrument, setSelectedInstrument] =
    useState<Instrument>('ukulele')
  const [songChordIds, setSongChordIds] = useState<string[]>([])
  const visibleChords = useMemo(
    () => chords.filter((chord) => chord.instrument === selectedInstrument),
    [selectedInstrument],
  )
  const [selectedChordId, setSelectedChordId] = useState(visibleChords[0].id)
  const text = translations[language]

  const selectedChord =
    visibleChords.find((chord) => chord.id === selectedChordId) ??
    visibleChords[0]

  const songChords = visibleChords.filter((chord) =>
    songChordIds.includes(chord.id),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    saveLanguageCookie(language)
  }, [language])

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

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">{text.appName}</p>
          <h1>{text.title}</h1>
        </div>

        <div className="top-controls">
          <label className="select-control">
            <span>{text.language}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </label>

          <label className="select-control">
            <span>{text.theme}</span>
            <select
              value={theme}
              onChange={(event) => setTheme(event.target.value as Theme)}
            >
              <option value="light">{text.light}</option>
              <option value="dark">{text.dark}</option>
            </select>
          </label>

          <div className="instrument-switcher" aria-label={text.instrumentLabel}>
            {instruments.map((instrument) => (
              <button
                key={instrument.id}
                type="button"
                className={instrument.id === selectedInstrument ? 'active' : ''}
                onClick={() => selectInstrument(instrument.id)}
              >
                {instrument.id === 'guitar' ? text.guitar : instrument.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="content-layout">
        <aside className="chord-list" aria-label={text.chordListLabel}>
          <div className="panel-heading">
            <h2>
              {selectedInstrument === 'ukulele' ? 'Ukulele' : text.guitar}
            </h2>
            <span>
              {songChords.length} {text.inSong}
            </span>
          </div>
          <div className="chord-buttons" aria-label={text.chordButtonsLabel}>
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
                  {text.song}
                </label>
              </div>
            ))}
          </div>
        </aside>

        <section className="diagram-panel" aria-live="polite">
          <div className="selected-chord">
            <span>{text.selected}</span>
            <strong>{selectedChord.name}</strong>
          </div>
          <ChordDiagram chord={selectedChord} />
        </section>
      </section>

      <section className="song-reference" aria-label={text.songReferenceLabel}>
        <div className="reference-heading">
          <div>
            <p className="eyebrow">{text.songPractice}</p>
            <h2>{text.quickReference}</h2>
          </div>
          {songChords.length > 0 && (
            <button type="button" onClick={() => setSongChordIds([])}>
              {text.clearSelection}
            </button>
          )}
        </div>

        {songChords.length === 0 ? (
          <p className="empty-reference">{text.emptyReference}</p>
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
