import { createFileRoute } from '@tanstack/react-router'

import {
  Button,
  CrudListTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  DialogFooter,
} from '@/components'
import { SmtpForm, useDeleteSmtp, useGetSmtpData, mapSmtpToFormValues } from '@/features/emailSetting'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import type { SmtpFormValues } from '@/lib/schema/smtp.schema'
import { columns } from './_components/columns'
import type { TSmtp } from '@/typescript'

function SmtpPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetSmtpData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; smtp: TSmtp | null }>({
    open: false,
    smtp: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, smtp: null }), [])
  const openEdit = useCallback(
    (smtp: TSmtp) => setSheet({ open: true, smtp: normalizeEntityId(smtp) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, smtp: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteSmtp, isPending: isDeleting } = useDeleteSmtp()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteSmtp({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteSmtp])

  const defaultValues = useMemo<Partial<SmtpFormValues> | undefined>(() => {
    if (!sheet.smtp) return undefined
    return mapSmtpToFormValues(sheet.smtp)
  }, [sheet.smtp])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SMTP Settings</h1>
        <Button onClick={openCreate}>Add SMTP Account</Button>
      </div>

      <CrudListTable
        columns={columns}
        rows={rows}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        limit={limit}
        loading={isInitialLoading}
        meta={tableHandlers}
      />

      <Sheet open={sheet.open} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-3xl">
          <SheetHeader className="shrink-0 border-b px-6 py-5">
            <SheetTitle>{sheet.smtp ? 'Edit SMTP Settings' : 'Create SMTP Settings'}</SheetTitle>
            <SheetDescription>
              {sheet.smtp
                ? 'Update SMTP server configuration'
                : 'Create a new SMTP server configuration'}
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-hidden">
            {isFormMounted ? (
              <SmtpForm
                key={sheet.smtp?.id ?? 'create'}
                onCancel={closeSheet}
                onSuccess={closeSheet}
                defaultValues={defaultValues}
                editId={sheet.smtp?.id}
              />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete SMTP Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this SMTP configuration?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} loading={isDeleting}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/dashboard/emailSetting/smtp/')({
  component: SmtpPage,
})
