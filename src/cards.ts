export type CardConfig = {
  xPctDesktop: number
  xPctMobile: number
  scale: number
  rotateStart: number
  rotateEnd: number
  /** Scroll progress (0–1) when the card crosses the center of the viewport (y = 0). */
  centerAt: number
  /** How many vh the card moves per unit of scroll progress. Higher = faster fall. */
  speed: number
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

// centerAt : scroll progress when the card is at y=0 (center of viewport)
// speed    : vh per scroll-progress unit (260 = crosses full viewport in ~0.4 progress)
export const cardConfigs: CardConfig[] = [
  { xPctDesktop: 14, xPctMobile: 4, scale: 0.95, rotateStart: -7, rotateEnd: 5, centerAt: 0.20, speed: 750 },
  { xPctDesktop: 36, xPctMobile: 36, scale: 1.0, rotateStart: 4, rotateEnd: -3, centerAt: 0.55, speed: 600 },
  { xPctDesktop: 58, xPctMobile: 23, scale: 0.88, rotateStart: -3, rotateEnd: 6, centerAt: 0.35, speed: 650 },
  { xPctDesktop: 74, xPctMobile: 48, scale: 0.92, rotateStart: 6, rotateEnd: -4, centerAt: 0.75, speed: 700 },
]
