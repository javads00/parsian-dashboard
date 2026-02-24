import {
  Calendar,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Permission,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components'
import {
  type DATE_FIELD_MAP,
  ORDER_PAGE_FILTER_DATE_OPTIONS,
  ORDER_PAGE_FILTER_ROW_PER_PAGE_OPTIONS,
} from '@/data'
import { cn } from '@/lib'
import { format } from 'date-fns'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import type { OrderStatus } from './type'

export function OrdersFilterUi({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-wrap items-center gap-4', className)} {...props} />
}

OrdersFilterUi.RowPerPage = function RowPerPage({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <Permission owner>
      <Select value={value.toString()} onValueChange={(v) => onChange(Number(v))}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ORDER_PAGE_FILTER_ROW_PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Permission>
  )
}

OrdersFilterUi.Status = function Status({
  value,
  onChange,
  statusData,
}: {
  value?: string
  onChange: (value: string) => void
  statusData: OrderStatus[]
}) {
  const selectedItem = statusData.find((s) => s.id === value) ?? null

  return (
    <Permission owner>
      <Combobox
        items={statusData}
        value={selectedItem}
        onValueChange={(item) => {
          if (item) onChange(item.id)
        }}
        isItemEqualToValue={(a, b) => a.id === b.id}
      >
        <ComboboxInput placeholder="Status" />

        <ComboboxContent className="max-h-96">
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Permission>
  )
}

OrdersFilterUi.DatePicker = function DatePicker({
  from,
  to,
  onChange,
}: {
  from?: string
  to?: string
  onChange: (dateType: keyof typeof DATE_FIELD_MAP, from?: string, to?: string) => void
}) {
  const [dateType, setDateType] = useState<keyof typeof DATE_FIELD_MAP>(
    ORDER_PAGE_FILTER_DATE_OPTIONS[0].value as keyof typeof DATE_FIELD_MAP
  )
  const datePicker: DateRange | undefined =
    from || to
      ? {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      }
      : undefined

  return (
    <Permission owner>
      <InputGroup className="max-w-xs">
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupButton variant="ghost" className="w-fit border-none text-xs font-normal">
              {datePicker?.from ? (
                datePicker.to ? (
                  <>
                    {format(datePicker.from, 'LLL dd, y')} - {format(datePicker.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(datePicker.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </InputGroupButton>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={datePicker}
              onSelect={(range) =>
                onChange(
                  dateType,
                  range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
                  range?.to ? format(range.to, 'yyyy-MM-dd') : undefined
                )
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <InputGroupAddon>
          <Select
            value={dateType}
            onValueChange={(value) => setDateType(value as keyof typeof DATE_FIELD_MAP)}
          >
            <SelectTrigger
              variant="ghost"
              className="w-[120px] border-none pr-1.5 text-xs focus-visible:ring-0"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectGroup>
                {ORDER_PAGE_FILTER_DATE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputGroupAddon>
      </InputGroup>
    </Permission>
  )
}

OrdersFilterUi.Search = function Search({
  value,
  onChange,
}: {
  value?: string
  onChange: (value: string) => void
}) {
  return (
    <Permission owner>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Permission>
  )
}
