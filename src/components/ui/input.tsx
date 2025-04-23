
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
          flex h-11 w-full text-base rounded-md border border-input bg-background
          px-4 py-2 text-foreground shadow-sm
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          transition-all duration-150
          disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted
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
