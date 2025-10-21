import { atom } from 'jotai'
import { persistTaskInstance } from '@/state/persistence/effects.ts'
import { getCurrentPeriodKey, getPeriodStartDate } from '@/features/tasks/lib/recurrence.ts'
import { settingsAtom } from '@/state/atoms/settings.ts'
import { tasksAtom } from '@/state/atoms/tasks.ts'
import type { TaskInstance } from '@/types/task.ts'
import { isoNow } from '@/utils/time.ts'
import { createId } from '@/utils/uuid.ts'

export const taskInstancesAtom = atom<TaskInstance[]>([])

const instanceKey = (taskId: string, periodKey: string) => `${taskId}-${periodKey}`

export const todayInstancesAtom = atom((get) => {
  const instances = get(taskInstancesAtom)
  const settings = get(settingsAtom)
  const tasks = get(tasksAtom)
  const map = new Map<string, TaskInstance>()

  for (const instance of instances) {
    map.set(instanceKey(instance.taskId, instance.periodKey), instance)
  }

  const now = new Date()

  return tasks.map((task) => {
    const periodKey = getCurrentPeriodKey(task.recurrence, now, settings.firstDayOfWeek)
    const key = instanceKey(task.id, periodKey)
    const existing = map.get(key)

    if (existing) {
      return existing
    }

    const periodStart = getPeriodStartDate(task.recurrence, now, settings.firstDayOfWeek)

    return {
      id: createId(),
      taskId: task.id,
      periodKey,
      dueDate: periodStart.toISOString(),
      completedAt: null,
    }
  })
})

export const toggleTaskCompletionAtom = atom(null, async (get, set, taskId: string) => {
  const tasks = get(tasksAtom)
  const task = tasks.find((candidate) => candidate.id === taskId)
  if (!task) return

  const settings = get(settingsAtom)
  const now = new Date()
  const periodKey = getCurrentPeriodKey(task.recurrence, now, settings.firstDayOfWeek)
  const periodStart = getPeriodStartDate(task.recurrence, now, settings.firstDayOfWeek)
  const instances = get(taskInstancesAtom)

  const nextInstances = [...instances]
  const idx = nextInstances.findIndex(
    (instance) => instance.taskId === taskId && instance.periodKey === periodKey,
  )

  if (idx === -1) {
    const created: TaskInstance = {
      id: createId(),
      taskId,
      periodKey,
      dueDate: periodStart.toISOString(),
      completedAt: isoNow(),
    }
    nextInstances.push(created)
    set(taskInstancesAtom, nextInstances)
    await persistTaskInstance(created)
    return
  }

  const existing = nextInstances[idx]
  const toggled: TaskInstance = {
    ...existing,
    completedAt: existing.completedAt ? null : isoNow(),
  }
  nextInstances[idx] = toggled
  set(taskInstancesAtom, nextInstances)
  await persistTaskInstance(toggled)
})
