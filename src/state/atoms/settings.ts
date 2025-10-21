import { atom } from 'jotai'
import { persistSettings } from '@/state/persistence/effects.ts'
import { defaultSettings, type Settings } from '@/types/settings.ts'

export const settingsAtom = atom<Settings>(defaultSettings())

export const updateSettingsAtom = atom(
  null,
  async (get, set, updater: (current: Settings) => Settings) => {
    const current = get(settingsAtom)
    const next = updater(current)
    set(settingsAtom, next)
    await persistSettings(next)
  },
)

export const setCurrentPetAtom = atom(null, async (_get, set, petId: Settings['currentPet']) => {
  await set(updateSettingsAtom, (current) => ({
    ...current,
    currentPet: petId,
    favorites: Array.from(new Set([petId, ...current.favorites])),
  }))
})

export const markOnboardingCompleteAtom = atom(null, async (_get, set) => {
  const now = new Date().toISOString()
  await set(updateSettingsAtom, (current) => ({
    ...current,
    onboardingCompletedAt: now,
  }))
})

export const markFailScreenSeenAtom = atom(null, async (_get, set) => {
  const now = new Date().toISOString()
  await set(updateSettingsAtom, (current) => ({
    ...current,
    failScreenAcknowledgedAt: now,
  }))
})

export const updateLastResetAtom = atom(null, async (_get, set, iso: string) => {
  await set(updateSettingsAtom, (current) => ({
    ...current,
    lastResetAt: iso,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }))
})
