import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[150px] w-full rounded-lg border border-dark-secondary/30 bg-dark-primary/50 px-4 py-3 text-base text-dark-accent placeholder:text-dark-accent/40 focus:outline-none focus:ring-2 focus:ring-dark-accent/50 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
