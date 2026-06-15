import {
  crudActionsColumn,
  crudCreatedAtColumn,
  crudRowNumberColumn,
} from '@/lib/table/crudColumns'
import { normalizeMongoId } from '@/features/emailSetting/utils'
import { type TEmailEjs } from '@/typescript'
import { type ColumnDef } from '@tanstack/react-table'

function getSmtpDisplayValue(emailId: TEmailEjs['emailId']): string {
  if (emailId && typeof emailId === 'object') {
    if ('email' in emailId && typeof emailId.email === 'string') {
      return emailId.email
    }
    return normalizeMongoId(emailId)
  }

  return normalizeMongoId(emailId)
}

export const columns: ColumnDef<TEmailEjs>[] = [
  crudRowNumberColumn<TEmailEjs>(),
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
    accessorKey: 'EJSName',
    header: 'EJS Name',
    cell: ({ row }) => <div>{row.original?.EJSName}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.original?.name}</div>,
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
  crudCreatedAtColumn<TEmailEjs>(),
  crudActionsColumn<TEmailEjs>(),
]
