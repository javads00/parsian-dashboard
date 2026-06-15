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
import {
  EmailEjsForm,
  useDeleteEmailEjs,
  useGetEmailEjsData,
  mapEmailEjsToFormValues,
} from '@/features/emailSetting'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import type { EmailEjsFormValues } from '@/lib/schema/emailEjs.schema'
import { columns } from './_components/columns'
import type { TEmailEjs } from '@/typescript'

function EmailEjsPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetEmailEjsData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; item: TEmailEjs | null }>({
    open: false,
    item: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, item: null }), [])
  const openEdit = useCallback(
    (item: TEmailEjs) => setSheet({ open: true, item: normalizeEntityId(item) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, item: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteEmailEjs, isPending: isDeleting } = useDeleteEmailEjs()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteEmailEjs({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteEmailEjs])

  const defaultValues = useMemo<Partial<EmailEjsFormValues> | undefined>(() => {
    if (!sheet.item) return undefined
    return mapEmailEjsToFormValues(sheet.item)
  }, [sheet.item])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email EJS</h1>
        <Button onClick={openCreate}>Add Email EJS</Button>
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
            <SheetTitle>{sheet.item ? 'Edit Email EJS' : 'Create Email EJS'}</SheetTitle>
            <SheetDescription>
              {sheet.item
                ? 'Update EJS template metadata and SMTP link'
                : 'Create a new email EJS configuration'}
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-hidden">
            {isFormMounted ? (
              <EmailEjsForm
                key={sheet.item?.id ?? 'create'}
                onCancel={closeSheet}
                onSuccess={closeSheet}
                defaultValues={defaultValues}
                editId={sheet.item?.id}
              />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Email EJS</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this email EJS configuration?
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

export const Route = createFileRoute('/_authenticated/dashboard/emailSetting/emailEjs/')({
  component: EmailEjsPage,
})
