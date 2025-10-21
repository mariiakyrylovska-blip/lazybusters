import { format, startOfDay, subDays, subMonths, subWeeks } from 'date-fns'
import type { FirstDayOfWeek } from '@/types/settings.ts'
import type { Recurrence } from '@/types/task.ts'
import { startOfMonthLocal, startOfTodayLocal, startOfWeekLocal } from '@/utils/time.ts'

export const getCurrentPeriodKey = (
  recurrence: Recurrence,
  date = new Date(),
  firstDayOfWeek: FirstDayOfWeek = 1,
) => {
  switch (recurrence) {
    case 'daily':
      return format(date, 'yyyy-MM-dd')
    case 'weekly': {
      const start = startOfWeekLocal(date, firstDayOfWeek)
      return format(start, 'yyyy-ww')
    }
    case 'monthly': {
      const start = startOfMonthLocal(date)
      return format(start, 'yyyy-MM')
    }
    default:
      return format(date, 'yyyy-MM-dd')
  }
}

export const getPeriodStartDate = (
  recurrence: Recurrence,
  date = new Date(),
  firstDayOfWeek: FirstDayOfWeek = 1,
) => {
  switch (recurrence) {
    case 'daily':
      return startOfTodayLocal()
    case 'weekly':
      return startOfWeekLocal(date, firstDayOfWeek)
    case 'monthly':
      return startOfMonthLocal(date)
  }
}

export const getPreviousPeriodKey = (
  recurrence: Recurrence,
  date = new Date(),
  firstDayOfWeek: FirstDayOfWeek = 1,
) => {
  switch (recurrence) {
    case 'daily':
      return getCurrentPeriodKey(recurrence, subDays(date, 1), firstDayOfWeek)
    case 'weekly':
      return getCurrentPeriodKey(recurrence, subWeeks(date, 1), firstDayOfWeek)
    case 'monthly':
      return getCurrentPeriodKey(recurrence, subMonths(date, 1), firstDayOfWeek)
  }
}

export const getPreviousPeriodStartDate = (
  recurrence: Recurrence,
  date = new Date(),
  firstDayOfWeek: FirstDayOfWeek = 1,
) => {
  switch (recurrence) {
    case 'daily':
      return startOfDay(subDays(date, 1))
    case 'weekly':
      return startOfWeekLocal(subWeeks(date, 1), firstDayOfWeek)
    case 'monthly':
      return startOfMonthLocal(subMonths(date, 1))
  }
}

export const isBoundaryPassed = (lastResetISO: string, now = new Date()) => {
  const last = lastResetISO ? new Date(lastResetISO) : new Date(0)
  const startToday = startOfTodayLocal()
  return last < startToday && now >= startToday
}

export const periodLabel = (recurrence: Recurrence, date = new Date()) => {
  switch (recurrence) {
    case 'daily':
      return format(date, 'MMMM d, yyyy')
    case 'weekly':
      return `Week of ${format(startOfWeekLocal(date, 1), 'MMMM d')}`
    case 'monthly':
      return format(date, 'MMMM yyyy')
  }
}
