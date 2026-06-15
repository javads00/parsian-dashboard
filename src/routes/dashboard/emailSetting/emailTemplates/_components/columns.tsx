import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { normalizeMongoId } from '@/features/emailSetting/utils'
import { type TEmailTemplate } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

function getSmtpDisplayValue(emailId: TEmailTemplate['emailId']): string {
  if (emailId && typeof emailId === 'object') {
    if ('email' in emailId && typeof emailId.email === 'string') {
      return emailId.email
    }
    return normalizeMongoId(emailId)
  }

  return normalizeMongoId(emailId)
}

export const columns: ColumnDef<TEmailTemplate>[] = [
  crudRowNumberColumn<TEmailTemplate>(),
  {
    accessorKey: 'subject',
    header: 'Subject',
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original?.subject}>
        {row.original?.subject}
      </div>
    ),
  },
  {
    accessorKey: 'discretion',
    header: 'Description',
    cell: ({ row }) => (
      <div className="max-w-xs truncate" title={row.original?.discretion}>
        {row.original?.discretion}
      </div>
    ),
  },
  {
    accessorKey: 'emailId',
    header: 'SMTP Account',
    cell: ({ row }) => {
      const value = getSmtpDisplayValue(row.original?.emailId)
      return (
        <div className="max-w-xs truncate text-sm" title={value}>
          {value || '-'}
        </div>
      )
    },
  },
  crudCreatedAtColumn<TEmailTemplate>(),
  crudActionsColumn<TEmailTemplate>(),
]
