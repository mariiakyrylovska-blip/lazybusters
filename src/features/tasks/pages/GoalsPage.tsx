import { useEffect, useMemo } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { petCatalog } from '@/types/pet.ts'
import { formatDisplayDate } from '@/utils/time.ts'
import { TaskItem } from '@/features/tasks/components/TaskItem.tsx'
import { Button } from '@/features/ui/components/Button.tsx'
import { QuoteBubble } from '@/features/pets/components/QuoteBubble.tsx'
import { allCompleteTodayAtom } from '@/state/derived/allCompleteToday.ts'
import { activeTasksAtom } from '@/state/atoms/tasks.ts'
import { todayInstancesAtom, toggleTaskCompletionAtom } from '@/state/atoms/taskInstances.ts'
import { consumePendingFailAtom } from '@/state/atoms/ui.ts'
import { settingsAtom } from '@/state/atoms/settings.ts'

export const GoalsPage = () => {
  const navigate = useNavigate()
  const settings = useAtomValue(settingsAtom)
  const tasks = useAtomValue(activeTasksAtom)
  const todayInstances = useAtomValue(todayInstancesAtom)
  const allComplete = useAtomValue(allCompleteTodayAtom)
  const toggleTaskCompletion = useSetAtom(toggleTaskCompletionAtom)
  const [pendingFail, acknowledgeFail] = useAtom(consumePendingFailAtom)

  const pet = petCatalog[settings.currentPet]
  const today = useMemo(() => formatDisplayDate(new Date()), [])
  const encouragement = useMemo(() => pet.affirmations[0] ?? 'You can do it!', [pet])

  useEffect(() => {
    if (pendingFail) {
      acknowledgeFail()
      navigate('/fail', { replace: true })
    }
  }, [acknowledgeFail, navigate, pendingFail])

  useEffect(() => {
    if (allComplete && tasks.length > 0) {
      navigate('/congrats', { replace: true })
    }
  }, [allComplete, navigate, tasks.length])

  const instanceByTask = useMemo(() => {
    const map = new Map<string, (typeof todayInstances)[number]>()
    for (const instance of todayInstances) {
      map.set(instance.taskId, instance)
    }
    return map
  }, [todayInstances])

  return (
    <div className="flex flex-col bg-gradient-to-b from-fog-50 to-mint-100/60 min-h-screen">
      <div className="flex flex-col items-center gap-6 px-4 md:px-6 lg:px-8 pt-8 flex-1 mx-auto max-w-md w-full">
        <div className="relative w-full overflow-hidden rounded-3xl bg-peach-50 shadow-soft">
          <div className="flex h-64 flex-col items-center justify-center gap-3" style={
            pet.id === 'arlo'
              ? { backgroundImage: 'url(/bb-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }
              : pet.id === 'sasa'
              ? { backgroundImage: 'url(/d2-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }
              : pet.id === 'luma'
              ? { backgroundImage: 'url(/d6-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }
              : {}
          }>
            <QuoteBubble text={encouragement} />
            <img
              src={pet.id === 'arlo' ? '/9119.png' : pet.id === 'sasa' ? '/9120.png' : pet.id === 'luma' ? '/9118.png' : ''}
              alt={pet.name}
              className="h-40 w-40 object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-2 py-4">
            <p className="font-display text-2xl text-font-primary">{pet.name}</p>
            <span className="text-4xl" role="img" aria-hidden>
              {pet.emoji}
            </span>
          </div>
        </div>
        <div className="w-full text-center">
          {tasks.length === 0 ? (
            <>
              <p className="font-display text-2xl text-font-primary">No goals yet!</p>
              <p className="mt-4 text-4xl">⬇️</p>
              <p className="mt-2 text-font-muted">Tap below to plan your comfort routine.</p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-font-primary">My goals for today:</p>
              <p className="text-font-muted">{today}</p>
            </>
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 w-full">
            {tasks.map((task) => {
              const instance = instanceByTask.get(task.id)
              if (!instance) return null
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  instance={instance}
                  onToggle={(taskId) => {
                    void toggleTaskCompletion(taskId)
                  }}
                  onEdit={(taskId) => navigate(`/tasks/${taskId}/edit`)}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="w-full max-w-md mx-auto px-4 md:px-6 lg:px-8 py-4">
        <Button fullWidth className="text-xl" onClick={() => navigate('/tasks/new')}>
          Add task
        </Button>
      </div>
    </div>
  )
}
