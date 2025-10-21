import type { Task, TaskInstance } from '@/types/task.ts'

interface TaskItemProps {
  task: Task
  instance: TaskInstance
  onToggle: (taskId: string) => void
  onEdit?: (taskId: string) => void
}

export const TaskItem = ({ task, instance, onToggle, onEdit }: TaskItemProps) => {
  const completed = Boolean(instance.completedAt)
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-fog-50/90 px-4 py-3 shadow-soft">
      <label className="flex flex-1 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-md border-2 border-peach-200 text-peach-200 focus:ring-peach-200"
          checked={completed}
          onChange={() => onToggle(task.id)}
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-font-primary">{task.title}</span>
          {task.notes && <span className="text-sm text-font-muted">{task.notes}</span>}
        </div>
      </label>
      {onEdit && (
        <button
          type="button"
          className="rounded-xl bg-transparent px-3 py-1 text-sm text-font-muted underline-offset-2 hover:underline"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
      )}
    </div>
  )
}
