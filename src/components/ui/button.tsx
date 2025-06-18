
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2 whitespace-nowrap
    rounded-xl text-base font-semibold ring-offset-background
    transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
    focus:outline-none focus:ring-2 focus:ring-primary/60
    relative overflow-hidden group
  `,
  {
    variants: {
      variant: {
        default: `
          bg-gradient-primary text-white shadow-lg hover:shadow-glow
          hover:scale-105 active:scale-95
          before:absolute before:inset-0 before:bg-shimmer before:translate-x-[-100%] 
          hover:before:translate-x-[100%] before:transition-transform before:duration-700
        `,
        destructive: `
          bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg
          hover:from-red-600 hover:to-red-700 hover:shadow-glow hover:scale-105
        `,
        outline: `
          border-2 border-primary/20 bg-background/50 backdrop-blur-sm text-foreground 
          hover:bg-primary/10 hover:border-primary/50 hover:scale-105
          glass-card
        `,
        secondary: `
          bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md
          hover:from-gray-200 hover:to-gray-300 hover:shadow-lg hover:scale-105
          dark:from-gray-800 dark:to-gray-700 dark:text-gray-100
        `,
        ghost: `
          hover:bg-accent/50 hover:text-accent-foreground backdrop-blur-sm
          hover:scale-105 rounded-xl
        `,
        link: `
          text-primary underline-offset-4 hover:underline
          relative after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0
          after:bg-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300
          hover:after:scale-x-100 hover:after:origin-left
        `,
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm rounded-lg",
        lg: "h-14 px-8 py-4 text-lg rounded-2xl",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
