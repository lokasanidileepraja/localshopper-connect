
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
          flex h-11 w-full text-base rounded-full border border-input px-4 py-2
          text-neutral-900 bg-white placeholder:text-neutral-400
          ring-offset-background
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
          transition-all duration-150
          disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted
          hover:bg-neutral-100
          `,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
