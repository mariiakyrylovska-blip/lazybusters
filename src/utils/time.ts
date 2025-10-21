import {
  format,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfTomorrow,
  startOfWeek,
} from 'date-fns'
import type { FirstDayOfWeek } from '@/types/settings.ts'

export const isoNow = () => new Date().toISOString()

export const toDate = (value: string | Date) =>
  typeof value === 'string' ? parseISO(value) : value

export const startOfTodayLocal = () => startOfDay(new Date())

export const startOfTomorrowLocal = () => startOfTomorrow()

export const startOfWeekLocal = (date: Date, weekStartsOn: FirstDayOfWeek) =>
  startOfWeek(date, { weekStartsOn })

export const startOfMonthLocal = (date: Date) => startOfMonth(date)

export const formatDisplayDate = (date: Date) => format(date, 'MMMM d, yyyy')
