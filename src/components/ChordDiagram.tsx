import { useEffect, useRef } from 'react'
import { SVGuitarChord } from 'svguitar'

import type { ChordShape } from '../data/chords'

type ChordDiagramProps = {
  chord: ChordShape
  theme: 'light' | 'dark'
}

export function ChordDiagram({ chord, theme }: ChordDiagramProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.innerHTML = ''

    const chart = new SVGuitarChord(containerRef.current)
    const chartColor = theme === 'dark' ? '#e5e7eb' : '#111827'
    const fingerColor = theme === 'dark' ? '#14b8a6' : '#0f766e'

    chart
      .configure({
        strings: chord.tuning.length,
        frets: 5,
        position: chord.baseFret ?? 1,
        tuning: chord.tuning,
        color: chartColor,
        titleColor: chartColor,
        stringColor: chartColor,
        fretColor: chartColor,
        fretLabelColor: chartColor,
        tuningsColor: chartColor,
        fingerColor,
        fingerTextColor: '#ffffff',
      })
      .chord({
        title: chord.name,
        barres: [],
        fingers: chord.frets.map((fret, index) => {
          const stringNumber = chord.tuning.length - index

          if (fret < 0) {
            return [stringNumber, 'x']
          }

          return [stringNumber, fret, String(chord.fingers?.[index] ?? 0)]
        }),
      })
      .draw()
  }, [chord, theme])

  return <div className="chord-diagram" ref={containerRef} />
}
