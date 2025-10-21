import { atom } from 'jotai'

interface UiState {
  pendingFailPeriodKey?: string | null
}

const initialUiState: UiState = {
  pendingFailPeriodKey: null,
}

export const uiStateAtom = atom<UiState>(initialUiState)

export const setPendingFailAtom = atom(
  null,
  (get, set, periodKey: string | null | undefined) => {
    const current = get(uiStateAtom)
    set(uiStateAtom, { ...current, pendingFailPeriodKey: periodKey ?? null })
  },
)

export const consumePendingFailAtom = atom(
  (get) => get(uiStateAtom).pendingFailPeriodKey,
  (get, set) => {
    const current = get(uiStateAtom)
    set(uiStateAtom, { ...current, pendingFailPeriodKey: null })
  },
)
