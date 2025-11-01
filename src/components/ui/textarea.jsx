import * as React from 'react';
import { cn } from '../../utils/cn';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded-lg border border-dark-card bg-dark-bg px-4 py-3 text-sm text-dark-text placeholder:text-dark-text/50 focus:outline-none focus:ring-2 focus:ring-dark-accent transition-all',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
