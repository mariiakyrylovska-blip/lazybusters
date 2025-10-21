import Dexie, { type Table } from 'dexie'
import type { Settings } from '@/types/settings.ts'
import type { Task, TaskInstance } from '@/types/task.ts'

export interface SettingsRow {
  key: string
  value: Settings
}

class HabitDatabase extends Dexie {
  tasks!: Table<Task, string>
  taskInstances!: Table<TaskInstance, string>
  settings!: Table<SettingsRow, string>

  constructor() {
    super('lazy-busters-db')
    this.version(1).stores({
      tasks: 'id, recurrence, archived',
      taskInstances: 'id, taskId, periodKey, dueDate',
      settings: 'key',
    })
  }
}

export const db = new HabitDatabase()
export const SETTINGS_KEY = 'app-settings'
