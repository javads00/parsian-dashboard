import { format } from 'date-fns'

import { timestampToDate } from '@/components/ui/forms/dateTimeInput/DateTimeInput'

export function formatExpiryTimestamp(value: number): string {
  const date = timestampToDate(value)
  if (!date) return 'Not set'
  return format(date, 'PPP p')
}
