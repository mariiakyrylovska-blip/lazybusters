export type PetId = 'arlo' | 'sasa' | 'luma' | 'koshara' | 'stasik'

export interface PetInfo {
  id: PetId
  name: string
  emoji: string
  description: string
  asset: string
  backgroundImage?: string
  affirmations: string[]
  getImagePath?: () => string
}

export const petCatalog: Record<PetId, PetInfo> = {
  arlo: {
    id: 'arlo',
    name: 'Arlo',
    emoji: '🍀',
    description: 'Steady and kind, your loyal guide.',
    asset: '/assets/pets/arlo.png',
    backgroundImage: '/arlo-bg.png',
    affirmations: [
      'You can do it!',
      'One gentle step at a time.',
      'Kindness to yourself builds magic.',
    ],
    getImagePath: () => `${import.meta.env.BASE_URL}9119.png`,
  },
  sasa: {
    id: 'sasa',
    name: 'Sasa',
    emoji: '🌿',
    description: 'Soft and calm, always ready to cheer.',
    asset: '/assets/pets/sasa.png',
    affirmations: [
      'Small body, big dreams.',
      'Hay today, success tomorrow!',
      'No naps before achievements.',
      'Remember: even a guinea pig becomes a legend with daily effort.',
      'Less scrolling, more squeaking!',
      'Stay sharp — and keep your fur clean.',
      'Motivation level: 100% carrot-powered.',
      'Nap hard, work harder.',
    ],
    getImagePath: () => `${import.meta.env.BASE_URL}9120.png`,
  },
  luma: {
    id: 'luma',
    name: 'Luma',
    emoji: '🌙',
    description: 'Bright and clever, always finding a way.',
    asset: '/assets/pets/luma.png',
    affirmations: [
      'Your creativity shines!',
      'Every step is a discovery.',
      'You learn fast—keep going!',
    ],
    getImagePath: () => `${import.meta.env.BASE_URL}9118.png`,
  },
  koshara: {
    id: 'koshara',
    name: 'Koshara',
    emoji: '🐱',
    description: 'Playful orange cat with a crown.',
    asset: '/assets/pets/koshara.png',
    affirmations: [
      'Nap hard, work harder.',
      'Focus like a cat watching a laser pointer.',
      'If I had nine lives, I\'d still spend one building habits.',
      'No excuses. Only meows and goals.',
      'Success smells like tuna.',
      'Chase your dreams — or I\'ll chase you.',
      'Meow means: keep going!',
      'Paws, breathe, and continue your streak.',
    ],
    getImagePath: () => `${import.meta.env.BASE_URL}koshara.png`,
  },
  stasik: {
    id: 'stasik',
    name: 'Stasik',
    emoji: '🐹',
    description: 'Curious and energetic hamster friend.',
    asset: '/assets/pets/stasik.png',
    affirmations: [
      'You can do it!',
      'Keep spinning those wheels!',
      'Small steps lead to big wins.',
      'Stay curious and keep going!',
      'Every habit is a victory lap.',
    ],
    getImagePath: () => `${import.meta.env.BASE_URL}stasik.png`,
  },
}
