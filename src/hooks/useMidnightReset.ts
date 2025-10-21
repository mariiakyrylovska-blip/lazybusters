import { useCallback, useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  getPreviousPeriodKey,
  getPreviousPeriodStartDate,
  isBoundaryPassed,
} from '@/features/tasks/lib/recurrence.ts'
import { scheduleMidnightReset } from '@/features/tasks/lib/resetScheduler.ts'
import { activeTasksAtom } from '@/state/atoms/tasks.ts'
import { settingsAtom, updateLastResetAtom } from '@/state/atoms/settings.ts'
import { setPendingFailAtom } from '@/state/atoms/ui.ts'
import { taskInstancesAtom } from '@/state/atoms/taskInstances.ts'

export const useMidnightReset = () => {
  const settings = useAtomValue(settingsAtom)
  const tasks = useAtomValue(activeTasksAtom)
  const instances = useAtomValue(taskInstancesAtom)

  const updateLastReset = useSetAtom(updateLastResetAtom)
  const setPendingFail = useSetAtom(setPendingFailAtom)

  const evaluateAndReset = useCallback(() => {
    const now = new Date()

    if (!isBoundaryPassed(settings.lastResetAt, now)) {
      return
    }

    const incompletePeriodKeys = new Set<string>()

    for (const task of tasks) {
      const prevKey = getPreviousPeriodKey(task.recurrence, now, settings.firstDayOfWeek)
      if (!prevKey) continue
      const prevStart = getPreviousPeriodStartDate(task.recurrence, now, settings.firstDayOfWeek)
      if (new Date(task.createdAt) > prevStart) {
        continue
      }
      const hasCompletedPrev = instances.some(
        (instance) =>
          instance.taskId === task.id && instance.periodKey === prevKey && !!instance.completedAt,
      )
      if (!hasCompletedPrev) {
        incompletePeriodKeys.add(prevKey)
      }
    }

    if (incompletePeriodKeys.size > 0) {
      const [firstKey] = incompletePeriodKeys
      setPendingFail(firstKey)
    } else {
      setPendingFail(null)
    }

    void updateLastReset(now.toISOString())
  }, [
    instances,
    settings.firstDayOfWeek,
    settings.lastResetAt,
    setPendingFail,
    tasks,
    updateLastReset,
  ])

  useEffect(() => {
    evaluateAndReset()
    const cancel = scheduleMidnightReset(evaluateAndReset)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        evaluateAndReset()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      cancel()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [evaluateAndReset])
}
