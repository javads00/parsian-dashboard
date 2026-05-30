import * as React from 'react'
import { cn } from '@/lib/utils'

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        'peer border-input focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border bg-transparent shadow-xs transition-all focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
