import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/features/ui/components/Button.tsx'
import type { Recurrence } from '@/types/task.ts'

export interface TaskFormValues {
  title: string
  notes?: string
  recurrence: Recurrence
}

interface TaskFormProps {
  initialValues?: TaskFormValues
  submitLabel: string
  onSubmit: (values: TaskFormValues) => Promise<void> | void
  onDelete?: () => Promise<void> | void
  heading?: string
}

const recurrenceOptions: { value: Recurrence; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

const defaultValues: TaskFormValues = {
  title: '',
  notes: '',
  recurrence: 'daily',
}

export const TaskForm = ({
  initialValues = defaultValues,
  submitLabel,
  onSubmit,
  onDelete,
  heading = 'Add new task!',
}: TaskFormProps) => {
  const [values, setValues] = useState<TaskFormValues>(initialValues)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!values.title.trim()) {
      setError('Please name your habit task.')
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ ...values, title: values.title.trim() })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="font-display text-2xl text-font-primary" htmlFor="task-title">
          {heading}
        </label>
        <textarea
          id="task-title"
          className="min-h-[140px] rounded-3xl border-2 border-peach-100 bg-fog-50 px-4 py-3 text-lg text-font-primary shadow-soft focus:border-peach-200 focus:outline-none"
          placeholder="What would you like to do?"
          value={values.title}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, title: event.target.value }))
            if (error) {
              setError(null)
            }
          }}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="font-display text-xl text-font-primary">Choose your comfort routine!</p>
          <p className="text-sm text-font-muted">Repeat your habit:</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {recurrenceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`rounded-2xl border-2 px-3 py-3 font-semibold ${
                values.recurrence === option.value
                  ? 'border-peach-200 bg-peach-100 text-font-primary shadow-soft'
                  : 'border-peach-50 bg-fog-50 text-font-muted'
              }`}
              onClick={() => setValues((prev) => ({ ...prev, recurrence: option.value }))}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" fullWidth disabled={submitting}>
          {submitLabel}
        </Button>
        {onDelete && (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => onDelete?.()}
            disabled={submitting}
          >
            Delete this task ❌
          </Button>
        )}
      </div>
    </form>
  )
}
