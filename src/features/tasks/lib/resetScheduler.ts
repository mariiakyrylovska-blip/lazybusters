import { startOfTomorrowLocal } from '@/utils/time.ts'

export type ResetCancel = () => void

export const scheduleMidnightReset = (callback: () => void): ResetCancel => {
  const now = Date.now()
  const nextMidnight = startOfTomorrowLocal().getTime()
  const delay = Math.max(1000, nextMidnight - now)
  const timer = window.setTimeout(() => {
    callback()
  }, delay)

  return () => window.clearTimeout(timer)
}
