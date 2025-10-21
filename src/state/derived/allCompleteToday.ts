import { atom } from 'jotai'
import { activeTasksAtom } from '@/state/atoms/tasks.ts'
import { todayInstancesAtom } from '@/state/atoms/taskInstances.ts'

export const allCompleteTodayAtom = atom((get) => {
  const tasks = get(activeTasksAtom)
  if (tasks.length === 0) return false

  const instances = get(todayInstancesAtom)
  return tasks.every((task) =>
    instances.some((instance) => instance.taskId === task.id && !!instance.completedAt),
  )
})
