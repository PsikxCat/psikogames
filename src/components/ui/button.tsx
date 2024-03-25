import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold tracking-normal transition-colors disabled:pointer-events-none',
  {
    variants: {
      variant: {
        main:
          'btn_default bg_orange_gradient border border-[2px] border-[var(--orange-light)] before:bg-[var(--red)] before:[box-shadow:0_0_0_2px_var(--orange-light),_0_.625em_0_0_var(--yellow-transparent)]',
        dark:
          'btn_default text-stone-300 bg_dark_gradient border border-[2px] border-[var(--dark-light)] before:bg-[var(--dark-dark)] before:[box-shadow:0_0_0_2px_var(--dark-light),_0_.625em_0_0_var(--dark-transparent)]',
        red:
          'btn_default text-primary bg_red_gradient border border-[2px] border-[var(--orange)] before:bg-[var(--red)] before:[box-shadow:0_0_0_2px_var(--orange),_0_.625em_0_0_var(--yellow-transparent)]',
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:pointer-events-none',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        sm: 'h-8 w-24 px-4 py-2 text-sm',
        md: 'h-10 w-32 px-6 py-3 text-md',
        lg: 'py-5 px-8 w-40 sm:w-48 text-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
