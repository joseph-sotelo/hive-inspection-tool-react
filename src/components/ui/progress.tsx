import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils/cn"

function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { max?: number }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-brand-light/20 relative h-6 w-full overflow-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-brand-light h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - ((value || 0) / (max || 100)) * 100}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
