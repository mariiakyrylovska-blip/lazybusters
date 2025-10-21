import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { TaskForm, type TaskFormValues } from '@/features/tasks/components/TaskForm.tsx'
import { addTaskAtom } from '@/state/atoms/tasks.ts'

export const AddTaskPage = () => {
  const navigate = useNavigate()
  const addTask = useSetAtom(addTaskAtom)

  const handleSubmit = async (values: TaskFormValues) => {
    await addTask(values)
    navigate('/goals', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-mint-50 pb-16">
      <div className="flex flex-1 flex-col gap-6 px-4 md:px-6 lg:px-8 pt-10 mx-auto max-w-md w-full">
        <TaskForm heading="Add new task!" submitLabel="Add task" onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
