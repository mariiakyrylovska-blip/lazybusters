import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { loadPersistedState } from '@/state/persistence/effects.ts'
import { settingsAtom } from '@/state/atoms/settings.ts'
import { taskInstancesAtom } from '@/state/atoms/taskInstances.ts'
import { tasksAtom } from '@/state/atoms/tasks.ts'

export const useAppHydration = () => {
  const setTasks = useSetAtom(tasksAtom)
  const setInstances = useSetAtom(taskInstancesAtom)
  const setSettings = useSetAtom(settingsAtom)
  const [hydrated, setHydrated] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let disposed = false

    const hydrate = async () => {
      try {
        const snapshot = await loadPersistedState()
        if (disposed) return
        setTasks(snapshot.tasks)
        setInstances(snapshot.taskInstances)
        setSettings(snapshot.settings)
        setHydrated(true)
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error('Unknown hydration error'))
        }
      }
    }

    hydrate()

    return () => {
      disposed = true
    }
  }, [setInstances, setSettings, setTasks])

  if (error) {
    throw error
  }

  return hydrated
}
