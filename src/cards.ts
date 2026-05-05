export type CardConfig = {
  xPctDesktop: number
  xPctMobile: number
  scale: number
  rotateStart: number
  rotateEnd: number
  startPct: number
  travelPct: number
}

export type GalleryItem = {
  title: string
  subtitle: string
  image: string
}

export const gallery: GalleryItem[] = [
  { title: 'Groles', subtitle: "J'adore les groles", image: '/images/groles.jpeg' },
  { title: 'Café', subtitle: 'Je carbure au café', image: '/images/cafe.jpeg' },
  { title: 'Code', subtitle: 'Le code ca me détends', image: '/images/image-4.jpg' },
  { title: 'Nature', subtitle: "J'aime bien les balades", image: '/images/mer.jpeg' },
]

// xPct       : horizontal anchor (% of stage width), distinct desktop/mobile
// scale      : depth-effect size variation
// rotate*    : rotation in degrees at start / end of fall
// startPct   : when (in section progress 0..1) the card begins falling
// travelPct  : how long the fall takes (smaller = faster card)
export const cardConfigs: CardConfig[] = [
  { xPctDesktop: 14, xPctMobile: 4, scale: 0.95, rotateStart: -7, rotateEnd: 5, startPct: 0.0, travelPct: 0.45 },
  { xPctDesktop: 36, xPctMobile: 53, scale: 1.0, rotateStart: 4, rotateEnd: -3, startPct: 0.3, travelPct: 0.65 },
  { xPctDesktop: 58, xPctMobile: 4, scale: 0.88, rotateStart: -3, rotateEnd: 6, startPct: 0.15, travelPct: 0.75 },
  { xPctDesktop: 74, xPctMobile: 53, scale: 0.92, rotateStart: 6, rotateEnd: -4, startPct: 0.05, travelPct: 0.95 },
]
