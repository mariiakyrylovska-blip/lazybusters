export type Recurrence = 'daily' | 'weekly' | 'monthly'

export interface Task {
  id: string
  title: string
  notes?: string
  recurrence: Recurrence
  archived: boolean
  createdAt: string
  updatedAt: string
}

export interface TaskInstance {
  id: string
  taskId: string
  periodKey: string
  dueDate: string
  completedAt?: string | null
}
