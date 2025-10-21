import { SETTINGS_KEY, db } from '@/db/dexie.ts'
import { defaultSettings, type Settings } from '@/types/settings.ts'
import type { Task, TaskInstance } from '@/types/task.ts'

export interface PersistedStateSnapshot {
  tasks: Task[]
  taskInstances: TaskInstance[]
  settings: Settings
}

export const loadPersistedState = async (): Promise<PersistedStateSnapshot> => {
  const [tasks, taskInstances, settingsRow] = await Promise.all([
    db.tasks.toArray(),
    db.taskInstances.toArray(),
    db.settings.get(SETTINGS_KEY),
  ])

  let settings = settingsRow?.value ?? defaultSettings()

  if (!settingsRow) {
    await db.settings.put({ key: SETTINGS_KEY, value: settings })
  }

  return { tasks, taskInstances, settings }
}

export const persistTask = async (task: Task) => {
  await db.tasks.put(task)
}

export const deleteTask = async (taskId: string) => {
  await db.transaction('rw', db.tasks, db.taskInstances, async () => {
    await db.tasks.delete(taskId)
    await db.taskInstances.where('taskId').equals(taskId).delete()
  })
}

export const persistTaskInstance = async (instance: TaskInstance) => {
  await db.taskInstances.put(instance)
}

export const deleteTaskInstance = async (instanceId: string) => {
  await db.taskInstances.delete(instanceId)
}

export const persistSettings = async (settings: Settings) => {
  await db.settings.put({ key: SETTINGS_KEY, value: settings })
}
