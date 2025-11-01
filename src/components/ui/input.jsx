import * as React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-lg border border-dark-card bg-dark-bg px-4 py-2 text-sm text-dark-text placeholder:text-dark-text/50 focus:outline-none focus:ring-2 focus:ring-dark-accent transition-all',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
