import type { PetId } from './pet.ts'

export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface Settings {
  id: 'singleton'
  currentPet: PetId
  favorites: PetId[]
  lastResetAt: string
  onboardingCompletedAt?: string
  failScreenAcknowledgedAt?: string
  firstDayOfWeek: FirstDayOfWeek
  timezone: string
}

export const defaultSettings = (): Settings => ({
  id: 'singleton',
  currentPet: 'arlo',
  favorites: ['arlo'],
  lastResetAt: new Date(0).toISOString(),
  onboardingCompletedAt: undefined,
  failScreenAcknowledgedAt: undefined,
  firstDayOfWeek: 1,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
})
