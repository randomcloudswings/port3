import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-dark-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-dark-accent/80 text-dark-text hover:bg-dark-accent',
        ghost: 'bg-transparent text-dark-text hover:text-white hover:bg-white/10',
        outline: 'border border-dark-accent text-dark-text hover:bg-dark-accent/10',
      },
      size: {
        sm: 'h-10 px-6',
        md: 'h-12 px-8',
        lg: 'h-14 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
