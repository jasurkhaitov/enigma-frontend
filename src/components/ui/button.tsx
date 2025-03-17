import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const buttonVariants = cva(
  "rounded-lg px-3 py-2 gap-2 font-medium flex items-center text-[16px] leading-6 tracking-normal transition-all duration-150 ease-linear cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-0 text-white bg-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-disabled-bg disabled:text-disabled-text disabled:hover:bg-disabled-bg disabled:active:bg-disabled-bg",
        outline: "border border-disabled-bg text-text hover:bg-white-mode active:bg-background-light active:bg-opacity-95 disabled:text-disabled-text disabled:border-disabled-bg disabled:bg-transparent disabled:active:bg-transparent",
        ghost: "border-none text-text bg-transparent hover:bg-white-mode active:bg-background-light active:bg-opacity-95 disabled:bg-transparent disabled:text-disabled-text",
        secondary: "bg-background-light text-text border-none hover:bg-disabled-bg active:bg-light-white disabled:bg-disabled-bg disabled:text-disabled-text",
        darkOutline: "border border-black text-text hover:bg-white-mode active:bg-background-light active:bg-opacity-95 disabled:text-disabled-text disabled:border-disabled-bg disabled:bg-transparent disabled:active:bg-transparent",
        outlined: "border border-black text-text hover:bg-white active:bg-background-light active:bg-opacity-95 disabled:text-disabled-text disabled:border-disabled-bg disabled:bg-transparent disabled:active:bg-transparent",
      },
      size: {
        default: "px-4 py-2",
        sm: "rounded-md px-3",
        lg: "rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ variant = "default", size = "default", className, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? "span" : "button"

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }