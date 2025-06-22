import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

interface ProgressProps extends ProgressPrimitive.ProgressProps {
  value?: number
  indicatorClassName?: string
}

export function Progress({ value = 0, indicatorClassName, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className="relative h-2 w-full overflow-hidden rounded bg-gray-200"
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full transition-all duration-200 ${indicatorClassName || 'bg-blue-600'}`}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  )
}
