import {
  Button,
  DataTable,
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
  Skeleton,
  DialogFooter,
} from '@/components'
import { createFileRoute } from '@tanstack/react-router'

import { LabelForm } from '@/features/label'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useDeleteLabel, useGetAdminsData } from '@/features/label/hooks'
import { createColumns } from './_components/columns'

import type { TLabel } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/label/')({
  component: LabelPage,
})

function LabelPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetAdminsData()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const rafRef = useRef<number | null>(null)

  const openCreate = useCallback(() => {
    setSheet({ open: true, label: null })
  }, [])

  const [sheet, setSheet] = useState<{
    open: boolean
    label: TLabel | null
  }>({
    open: false,
    label: null,
  })

  const openEdit = useCallback((label: TLabel) => {
    const normalizedLabel = label as TLabel & { _id?: string }
    const normalizedId = normalizedLabel.id ?? normalizedLabel._id
    setSheet({
      open: true,
      label: normalizedId ? ({ ...normalizedLabel, id: normalizedId } as TLabel) : normalizedLabel,
    })
  }, [])

  const closeSheet = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null

    setSheet({ open: false, label: null })
  }, [])

  /* ---------------------------
     memoized columns
  ----------------------------*/
  const columns = useMemo(
    () => createColumns(page, 10, undefined, openEdit, setDeleteId),
    [page, openEdit]
  )

  const { mutate: deleteLabel, isPending: isDeleting } = useDeleteLabel()

  const handleDelete = useCallback(() => {
    if (!deleteId) return

    deleteLabel(
      { id: deleteId },
      {
        onSuccess: async () => {
          await refetch()
          setDeleteId(null)
        },
      }
    )
  }, [deleteId, deleteLabel, refetch])
  
  const defaultValues = useMemo(() => {
    if (!sheet.label) return undefined
    return {
      name: sheet.label.name,
    }
  }, [sheet.label])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Labels</h1>
        <Button onClick={openCreate}>Add Label</Button>
      </div>

      {/* Table */}
      {isPending ? (
        <Skeleton className="h-[400px] w-full" />
      ) : (
        <DataTable
          key={dataUpdatedAt}
          loading={isPending}
          columns={columns}
          data={data?.data ?? []}
          total={data?.pages ?? 0}
          page={page}
          onPageChange={setPage}
        />
      )}

      {/* Sheet */}
      <Sheet open={sheet.open} onOpenChange={(v) => !v && closeSheet()}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{sheet.label ? 'Edit Label' : 'Create Label'}</SheetTitle>
            <SheetDescription>
              {sheet.label ? 'Update Label settings' : 'Create new Label with permissions'}
            </SheetDescription>
          </SheetHeader>

          <LabelForm
            key={sheet.label?.id ?? 'create'}
            onCancel={closeSheet}
            onSuccess={async () => {
              await refetch()
              closeSheet()
            }}
            defaultValues={defaultValues}
            editId={sheet.label?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
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
