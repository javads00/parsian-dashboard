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
import { RoleStatusAccessForm } from '@/features/roleStatusAccess/component/roleStatusAccessForm'
import { mapRoleStatusAccessToForm } from '@/features/roleStatusAccess/utils/mapRoleStatusAccessToForm'
import {
  useDeleteRoleStatusAccess,
  useGetRoleStatusAccessData,
} from '@/features/roleStatusAccess/hooks'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TRoleStatusAccessClient } from '@/typescript'

export function RoleStatusAccessPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetRoleStatusAccessData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; item: TRoleStatusAccessClient | null }>({
    open: false,
    item: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, item: null }), [])
  const openEdit = useCallback(
    (item: TRoleStatusAccessClient) => setSheet({ open: true, item: normalizeEntityId(item) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, item: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteRoleStatusAccess, isPending: isDeleting } = useDeleteRoleStatusAccess()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteRoleStatusAccess({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteRoleStatusAccess])

  const formDefaults = useMemo(
    () => (sheet.item ? mapRoleStatusAccessToForm(sheet.item) : undefined),
    [sheet.item]
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Status Access</h1>
        <Button onClick={openCreate}>Add Role Status Access</Button>
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
            <SheetTitle>
              {sheet.item ? 'Edit Role Status Access' : 'Create Role Status Access'}
            </SheetTitle>
            <SheetDescription>
              {sheet.item
                ? 'Update Role Status Access settings'
                : 'Create new Role Status Access with permissions'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <RoleStatusAccessForm
              key={sheet.item?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={
                formDefaults
                  ? {
                      roleId: formDefaults.roleId,
                      fullAccess: formDefaults.fullAccess,
                      fromStatus: formDefaults.fromStatus,
                      statusId: formDefaults.statusId,
                    }
                  : undefined
              }
              statusItemLabels={formDefaults?.statusItemLabels}
              editId={sheet.item?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role Status Access</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Role Status Access?
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
