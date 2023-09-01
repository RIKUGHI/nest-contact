import { ButtonHTMLAttributes, FC, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "flex px-4 h-9 items-center justify-center rounded-md text-white",
  {
    variants: {
      variant: {
        default: "bg-green-600",
        blue: "bg-blue-600",
        red: "bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      />
    )
  }
)

export { Button, buttonVariants }
