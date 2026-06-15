import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/forms/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/forms/input/Input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { DateTimeInputProps } from '@/typescript/types/components'

function timestampToDate(value?: number): Date | undefined {
  if (!value || value <= 0) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function buildTimestamp(date: Date, hours: number, minutes: number): number {
  const next = new Date(date)
  next.setHours(hours, minutes, 0, 0)
  return next.getTime()
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function DateTimeInput({
  value = 0,
  onChange,
  placeholder = 'Pick date and time',
  disabled = false,
  className,
  id,
}: DateTimeInputProps) {
  const [open, setOpen] = React.useState(false)
  const selectedDate = timestampToDate(value)
  const hours = selectedDate?.getHours() ?? 0
  const minutes = selectedDate?.getMinutes() ?? 0

  const updateDatePart = (date?: Date) => {
    if (!date) {
      onChange(0)
      return
    }

    onChange(buildTimestamp(date, hours, minutes))
  }

  const updateTimePart = (nextHours: number, nextMinutes: number) => {
    const base = selectedDate ?? new Date()
    onChange(buildTimestamp(base, nextHours, nextMinutes))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'h-8 w-full justify-start rounded-lg px-2.5 text-left text-sm font-normal',
            !selectedDate && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {selectedDate ? format(selectedDate, 'PPP p') : placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => updateDatePart(date)}
          defaultMonth={selectedDate}
        />

        <div className="flex items-center gap-2 border-t px-3 py-3">
          <div className="flex flex-1 items-center gap-2">
            <label className="text-muted-foreground text-xs">Hour</label>
            <Input
              type="number"
              min={0}
              max={23}
              value={hours}
              disabled={disabled}
              className="h-8"
              onChange={(event) =>
                updateTimePart(clamp(Number(event.target.value) || 0, 0, 23), minutes)
              }
            />
          </div>

          <span className="text-muted-foreground text-sm">:</span>

          <div className="flex flex-1 items-center gap-2">
            <label className="text-muted-foreground text-xs">Min</label>
            <Input
              type="number"
              min={0}
              max={59}
              value={minutes}
              disabled={disabled}
              className="h-8"
              onChange={(event) =>
                updateTimePart(hours, clamp(Number(event.target.value) || 0, 0, 59))
              }
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            disabled={disabled || !selectedDate}
            onClick={() => {
              onChange(0)
              setOpen(false)
            }}
            aria-label="Clear date"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateTimeInput, timestampToDate, buildTimestamp }
