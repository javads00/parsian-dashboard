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
import { RoleStatusMappingForm } from '@/features/roleStatusMapping/component/roleMappingForm'
import { useGetRoleStatusMappingData } from '@/features/roleStatusMapping'
import { useDeleteRoleMapping } from '@/features/roleStatusMapping/hooks'
import { mapRoleStatusMappingToForm } from '@/features/roleStatusMapping/utils/mapRoleStatusAccessToForm'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TRoleStatusMapping } from '@/typescript'

export function RoleStatusMappingPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetRoleStatusMappingData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; item: TRoleStatusMapping | null }>({
    open: false,
    item: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, item: null }), [])
  const openEdit = useCallback(
    (item: TRoleStatusMapping) => setSheet({ open: true, item: normalizeEntityId(item) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, item: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteRoleMapping, isPending: isDeleting } = useDeleteRoleMapping()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteRoleMapping({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteRoleMapping])

  const formDefaults = useMemo(
    () => (sheet.item ? mapRoleStatusMappingToForm(sheet.item) : undefined),
    [sheet.item]
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Status Mapping</h1>
        <Button onClick={openCreate}>Add Role Status Mapping</Button>
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
              {sheet.item ? 'Edit Role Status Mapping' : 'Create Role Status Mapping'}
            </SheetTitle>
            <SheetDescription>
              {sheet.item
                ? 'Update role status mapping settings'
                : 'Create a new role status mapping'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <RoleStatusMappingForm
              key={sheet.item?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={
                formDefaults
                  ? {
                      roleId: formDefaults.roleId,
                      visibleAs: formDefaults.visibleAs,
                      originals: formDefaults.originals,
                    }
                  : undefined
              }
              statusItemLabels={formDefaults?.originalItemLabels}
              editId={sheet.item?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role Status Mapping</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Role Status Mapping?
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
