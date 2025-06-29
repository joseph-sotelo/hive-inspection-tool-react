import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { CORNERS } from "@/constants"

import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-border text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent active:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:dark:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:bg-accent active:text-accent-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline active:underline",
        action:
          "bg-brand-light border-1 border-foreground-flexible-light text-foreground-flexible font-bold tracking-wide shadow-lg shadow-brand-light/60 hover:bg-brand-light/60 active:bg-brand-light/60",
        customSecondary:
          "border-1 border-foreground-flexible-light text-foreground-flexible font-semibold tracking-wide bg-foreground-flexible/10 hover:bg-foreground-flexible/30 active:bg-foreground-flexible/30",
        text:
          "hover:text-accent-foreground dark:hover:bg-accent/50 items-start active:text-accent-foreground",
        map:
          "bg-brand-light border-2 border-foreground-flexible-light text-foreground-flexible font-bold tracking-wide shadow-lg hover:bg-brand-light/60 active:bg-brand-light/60",
        iconGhost:
          "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 text-sm rounded-md",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-sm",
        action: "rounded-md py-3 px-6 text-sm w-full",
        icon: "size-9 text-sm rounded-md",
        text: "pl-0 text-sm rounded-md",
        map: `h-full text-lg rounded-xl px-6 ${CORNERS.CHILD}`,
        left: "h-9 px-0 py-2 has-[>svg]:px-0 text-sm rounded-md",
        iconGhost: "p-0 justify-start"    
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
