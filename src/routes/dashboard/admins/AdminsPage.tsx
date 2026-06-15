import {
  Button,
  CrudListTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components'
import { AdminForm } from '@/features/admins'
import { useDeleteAdmin } from '@/features/admins/hooks/useDeleteAdmin'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { useGetAdminsData } from './hooks/-index'
import { columns } from './_components/columns'
import type { TAdmin } from '@/typescript'

export function AdminsPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetAdminsData()
  const [sheetState, setSheetState] = useState<{ open: boolean; admin: TAdmin | null }>({
    open: false,
    admin: null,
  })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const isFormMounted = useDeferredMount(sheetState.open)
  const { mutate: mutateDeleteAdmin, isPending: isDeleting } = useDeleteAdmin()

  const openCreateSheet = useCallback(() => setSheetState({ open: true, admin: null }), [])
  const openEditSheet = useCallback(
    (admin: TAdmin) => setSheetState({ open: true, admin }),
    []
  )
  const closeSheet = useCallback(() => setSheetState({ open: false, admin: null }), [])

  const tableHandlers = useStableHandlers({
    onEdit: openEditSheet,
    onDelete: setDeleteId,
  })

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteId) return
    mutateDeleteAdmin(deleteId, {
      onSuccess: () => setDeleteId(null),
    })
  }, [deleteId, mutateDeleteAdmin])

  const editingAdmin = sheetState.admin
  const editingDefaultValues = useMemo(
    () =>
      editingAdmin
        ? {
            firstName: editingAdmin.firstName,
            lastName: editingAdmin.lastName,
            email: editingAdmin.email,
            username: editingAdmin.username,
            mobile: editingAdmin.mobile ?? editingAdmin.phone ?? '',
            roleId: editingAdmin.roleId?.id ?? '',
            password: '',
          }
        : undefined,
    [editingAdmin]
  )

  return (
    <div className="w-full space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admins</h1>
        <Button onClick={openCreateSheet}>Add Admin</Button>
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

      <Sheet open={sheetState.open} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{editingAdmin ? 'Edit Admin' : 'Create New Admin'}</SheetTitle>
            <SheetDescription>
              {editingAdmin
                ? 'Update administrator information.'
                : 'Fill out the form below to create a new admin user.'}
            </SheetDescription>
          </SheetHeader>
          {isFormMounted ? (
            <AdminForm
              onCancel={closeSheet}
              onSuccess={closeSheet}
              editId={editingAdmin?.id}
              defaultValues={editingDefaultValues}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this admin? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              loading={isDeleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
