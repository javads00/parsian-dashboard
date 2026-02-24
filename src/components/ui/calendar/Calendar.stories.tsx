import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { Calendar } from './Calendar'

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <Calendar />,
}

export const SingleDate: Story = {
  render: function SingleDateStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
    )
  },
}

export const DateRangeSelection: Story = {
  render: function DateRangeStory() {
    const today = new Date()
    const [range, setRange] = useState<DateRange | undefined>({
      from: today,
      to: addDays(today, 7),
    })

    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
    )
  },
}

export const MultipleDates: Story = {
  render: function MultipleDatesStory() {
    const [dates, setDates] = useState<Date[] | undefined>([])

    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
      />
    )
  },
}

export const WithDropdowns: Story = {
  render: function DropdownStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    )
  },
}

export const DisabledDates: Story = {
  render: function DisabledStory() {
    const today = new Date()
    const [date, setDate] = useState<Date | undefined>(today)

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: today }}
      />
    )
  },
}

export const WithWeekNumbers: Story = {
  render: function WeekNumbersStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showWeekNumber
      />
    )
  },
}

export const WithoutOutsideDays: Story = {
  render: function NoOutsideDaysStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
      />
    )
  },
}

export const TwoMonths: Story = {
  render: function TwoMonthsStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      />
    )
  },
}
