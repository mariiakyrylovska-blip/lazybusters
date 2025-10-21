import { atom } from 'jotai'
import { persistTask, deleteTask as deleteTaskFromDb } from '@/state/persistence/effects.ts'
import type { Recurrence, Task } from '@/types/task.ts'
import { isoNow } from '@/utils/time.ts'
import { createId } from '@/utils/uuid.ts'

export interface CreateTaskInput {
  title: string
  notes?: string
  recurrence: Recurrence
}

export interface UpdateTaskInput {
  id: string
  title: string
  notes?: string
  recurrence: Recurrence
}

export const tasksAtom = atom<Task[]>([])

export const activeTasksAtom = atom((get) => get(tasksAtom).filter((task) => !task.archived))

export const addTaskAtom = atom(null, async (get, set, payload: CreateTaskInput) => {
  const now = isoNow()
  const newTask: Task = {
    id: createId(),
    title: payload.title.trim(),
    notes: payload.notes?.trim(),
    recurrence: payload.recurrence,
    archived: false,
    createdAt: now,
    updatedAt: now,
  }

  set(tasksAtom, [...get(tasksAtom), newTask])
  await persistTask(newTask)
  return newTask
})

export const updateTaskAtom = atom(null, async (get, set, payload: UpdateTaskInput) => {
  const tasks = get(tasksAtom)
  const idx = tasks.findIndex((task) => task.id === payload.id)
  if (idx === -1) return

  const now = isoNow()
  const updated: Task = {
    ...tasks[idx],
    title: payload.title.trim(),
    notes: payload.notes?.trim(),
    recurrence: payload.recurrence,
    updatedAt: now,
  }

  const next = [...tasks]
  next[idx] = updated
  set(tasksAtom, next)
  await persistTask(updated)
})

export const deleteTaskAtom = atom(null, async (get, set, taskId: string) => {
  const tasks = get(tasksAtom)
  set(
    tasksAtom,
    tasks.filter((task) => task.id !== taskId),
  )
  await deleteTaskFromDb(taskId)
})

export const taskByIdAtom = atom((get) => (id: string) => get(tasksAtom).find((task) => task.id === id))
