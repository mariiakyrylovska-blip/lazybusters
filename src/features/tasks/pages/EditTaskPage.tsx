import { useMemo } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm, type TaskFormValues } from '@/features/tasks/components/TaskForm.tsx'
import { Button } from '@/features/ui/components/Button.tsx'
import { deleteTaskAtom, taskByIdAtom, updateTaskAtom } from '@/state/atoms/tasks.ts'

export const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const getTaskById = useAtomValue(taskByIdAtom)
  const updateTask = useSetAtom(updateTaskAtom)
  const deleteTask = useSetAtom(deleteTaskAtom)

  const task = useMemo(() => (id ? getTaskById(id) : undefined), [getTaskById, id])

  if (!task) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-mint-50 px-6 text-center">
        <div className="app-card max-w-sm">
          <h1 className="font-display text-3xl text-font-primary">Task not found</h1>
          <p className="mt-3 text-font-muted">We could not find that habit. Please pick another one.</p>
        </div>
      </div>
    )
  }

  const defaultValues: TaskFormValues = {
    title: task.title,
    notes: task.notes,
    recurrence: task.recurrence,
  }

  const handleSubmit = async (values: TaskFormValues) => {
    await updateTask({ id: task.id, ...values })
    navigate('/goals', { replace: true })
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this habit task?')
    if (!confirmed) return
    await deleteTask(task.id)
    navigate('/goals', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-mint-50 pb-16">
      <div className="flex justify-end px-4 md:px-6 lg:px-8 pt-6 pb-2 mx-auto max-w-md w-full">
        <Button
          variant="ghost"
          className="text-base"
          onClick={() => navigate('/goals')}
        >
          Exit ✕
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-6 px-4 md:px-6 lg:px-8 pt-4 mx-auto max-w-md w-full">
        <TaskForm
          heading="Edit your task"
          initialValues={defaultValues}
          submitLabel="Save"
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
