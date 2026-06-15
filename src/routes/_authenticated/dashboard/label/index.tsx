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
import { createFileRoute } from '@tanstack/react-router'
import { LabelForm } from '@/features/label'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { useDeleteLabel, useGetLabelData } from '@/features/label/hooks'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TLabel } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/label/')({
  component: LabelPage,
})

function LabelPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetLabelData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; label: TLabel | null }>({
    open: false,
    label: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, label: null }), [])
  const openEdit = useCallback(
    (label: TLabel) => setSheet({ open: true, label: normalizeEntityId(label) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, label: null }), [])

  const tableHandlers = useStableHandlers({
    onEdit: openEdit,
    onDelete: setDeleteId,
  })

  const { mutate: deleteLabel, isPending: isDeleting } = useDeleteLabel()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteLabel({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteLabel])

  const defaultValues = useMemo(
    () => (sheet.label ? { name: sheet.label.name } : undefined),
    [sheet.label]
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Labels</h1>
        <Button onClick={openCreate}>Add Label</Button>
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
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{sheet.label ? 'Edit Label' : 'Create Label'}</SheetTitle>
            <SheetDescription>
              {sheet.label ? 'Update Label settings' : 'Create new Label with permissions'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <LabelForm
              key={sheet.label?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={defaultValues}
              editId={sheet.label?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Label</DialogTitle>
            <DialogDescription>Are you sure you want to delete this label?</DialogDescription>
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
