import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  message: string
  onClose: () => void
}

export const Toast = ({ message, onClose }: ToastProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={cn(
        'fixed top-8 right-8 z-50 max-w-md bg-dark-secondary border border-dark-accent/30 rounded-lg p-4 shadow-xl',
        'animate-in slide-in-from-top-2 duration-300'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm text-dark-accent">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-dark-accent/70 hover:text-dark-accent transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
