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
import { OrderStatusForm } from '@/features/orderStatus'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { useDeleteOrderStatus, useGetOrderStausData } from '@/features/orderStatus/hooks'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TOrderStatus } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/orderStatus/')({
  component: OrderStatusPage,
})

function OrderStatusPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetOrderStausData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; item: TOrderStatus | null }>({
    open: false,
    item: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, item: null }), [])
  const openEdit = useCallback(
    (item: TOrderStatus) => setSheet({ open: true, item: normalizeEntityId(item) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, item: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteOrderStatus, isPending: isDeleting } = useDeleteOrderStatus()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteOrderStatus({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteOrderStatus])

  const defaultValues = useMemo(() => {
    if (!sheet.item) return undefined
    return {
      name: sheet.item.name,
      label: sheet.item.label,
      description: sheet.item.description,
      isPad: sheet.item.isPad,
    }
  }, [sheet.item])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">OrderStatus</h1>
        <Button onClick={openCreate}>Add OrderStatus</Button>
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
            <SheetTitle>{sheet.item ? 'Edit OrderStatus' : 'Create OrderStatus'}</SheetTitle>
            <SheetDescription>
              {sheet.item ? 'Update OrderStatus settings' : 'Create new OrderStatus'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <OrderStatusForm
              key={sheet.item?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={defaultValues}
              editId={sheet.item?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete OrderStatus</DialogTitle>
            <DialogDescription>Are you sure you want to delete this OrderStatus?</DialogDescription>
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
