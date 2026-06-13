export type Instrument = 'ukulele' | 'guitar'

export type ChordCategory = 'open'

export type ChordShape = {
  id: string
  name: string
  instrument: Instrument
  category: ChordCategory
  tuning: string[]
  frets: number[]
  fingers?: number[]
  baseFret?: number
}

const ukuleleTuning = ['G', 'C', 'E', 'A']
const guitarTuning = ['E', 'A', 'D', 'G', 'B', 'E']

type ChordInput = {
  name: string
  frets: number[]
  fingers?: number[]
}

function chord(
  instrument: Instrument,
  tuning: string[],
  { name, frets, fingers }: ChordInput,
): ChordShape {
  return {
    id: `${instrument}-${name.toLowerCase().replace('#', 'sharp')}`,
    name,
    instrument,
    category: 'open',
    tuning,
    frets,
    fingers,
  }
}

const ukuleleOpenChords: ChordInput[] = [
  { name: 'A', frets: [2, 1, 0, 0], fingers: [2, 1, 0, 0] },
  { name: 'A7', frets: [0, 1, 0, 0], fingers: [0, 1, 0, 0] },
  { name: 'Am', frets: [2, 0, 0, 0], fingers: [2, 0, 0, 0] },
  { name: 'Am7', frets: [0, 0, 0, 0], fingers: [0, 0, 0, 0] },
  { name: 'Bb', frets: [3, 2, 1, 1], fingers: [3, 2, 1, 1] },
  { name: 'B7', frets: [2, 3, 2, 2], fingers: [1, 3, 1, 1] },
  { name: 'Bm', frets: [4, 2, 2, 2], fingers: [3, 1, 1, 1] },
  { name: 'C', frets: [0, 0, 0, 3], fingers: [0, 0, 0, 3] },
  { name: 'C7', frets: [0, 0, 0, 1], fingers: [0, 0, 0, 1] },
  { name: 'Cmaj7', frets: [0, 0, 0, 2], fingers: [0, 0, 0, 2] },
  { name: 'D', frets: [2, 2, 2, 0], fingers: [1, 2, 3, 0] },
  { name: 'D7', frets: [2, 2, 2, 3], fingers: [1, 1, 1, 2] },
  { name: 'Dm', frets: [2, 2, 1, 0], fingers: [2, 3, 1, 0] },
  { name: 'E', frets: [1, 4, 0, 2], fingers: [1, 4, 0, 2] },
  { name: 'E7', frets: [1, 2, 0, 2], fingers: [1, 2, 0, 3] },
  { name: 'Em', frets: [0, 4, 3, 2], fingers: [0, 3, 2, 1] },
  { name: 'F', frets: [2, 0, 1, 0], fingers: [2, 0, 1, 0] },
  { name: 'Fmaj7', frets: [2, 4, 1, 3], fingers: [2, 4, 1, 3] },
  { name: 'G', frets: [0, 2, 3, 2], fingers: [0, 1, 3, 2] },
  { name: 'G7', frets: [0, 2, 1, 2], fingers: [0, 2, 1, 3] },
]

const guitarOpenChords: ChordInput[] = [
  { name: 'A', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
  { name: 'A7', frets: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 1, 0, 2, 0] },
  { name: 'Am', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  { name: 'Am7', frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0] },
  { name: 'Asus2', frets: [-1, 0, 2, 2, 0, 0], fingers: [0, 0, 1, 2, 0, 0] },
  { name: 'Asus4', frets: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 3, 0] },
  { name: 'B7', frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4] },
  { name: 'C', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  { name: 'C7', frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0] },
  { name: 'Cmaj7', frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0] },
  { name: 'D', frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  { name: 'D7', frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3] },
  { name: 'Dm', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  { name: 'Dsus2', frets: [-1, -1, 0, 2, 3, 0], fingers: [0, 0, 0, 1, 3, 0] },
  { name: 'Dsus4', frets: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4] },
  { name: 'E', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  { name: 'E7', frets: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0] },
  { name: 'Em', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  { name: 'Em7', frets: [0, 2, 2, 0, 3, 0], fingers: [0, 1, 2, 0, 3, 0] },
  { name: 'Fmaj7', frets: [-1, -1, 3, 2, 1, 0], fingers: [0, 0, 3, 2, 1, 0] },
  { name: 'G', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  { name: 'G7', frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1] },
]

export const chords: ChordShape[] = [
  ...ukuleleOpenChords.map((input) => chord('ukulele', ukuleleTuning, input)),
  ...guitarOpenChords.map((input) => chord('guitar', guitarTuning, input)),
]
