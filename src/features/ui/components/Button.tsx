import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  fullWidth,
  ...rest
}: ButtonProps) => (
  <button
    type="button"
    {...rest}
    className={clsx(
      'app-button',
      variant === 'secondary' && 'app-button--secondary',
      variant === 'ghost' && 'bg-transparent text-font-primary underline-offset-4 hover:underline',
      fullWidth && 'w-full justify-center',
      className,
    )}
  >
    {children}
  </button>
)
