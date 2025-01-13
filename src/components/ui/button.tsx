import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'icon' | 'sm'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variant === "default" && "bg-blue-500 text-white hover:bg-blue-600",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
          variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-50",
          size === "default" && "h-10 px-4 py-2",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 