import { useEffect, useRef } from 'react'
import { SVGuitarChord } from 'svguitar'

import type { ChordShape } from '../data/chords'

type ChordDiagramProps = {
  chord: ChordShape
}

export function ChordDiagram({ chord }: ChordDiagramProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.innerHTML = ''

    const chart = new SVGuitarChord(containerRef.current)

    chart
      .configure({
        strings: chord.tuning.length,
        frets: 5,
        position: chord.baseFret ?? 1,
        tuning: chord.tuning,
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
  }, [chord])

  return <div className="chord-diagram" ref={containerRef} />
}
