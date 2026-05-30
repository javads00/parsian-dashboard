import {
  Button,
  DataTable,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '@/components'
import { AdminForm } from '@/features/admins'
import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useGetAdminsData } from './hooks/-index'
import { createColumns } from './_components/columns'
import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'
import type { TAdmin } from '@/typescript'
import { request } from '@/lib/services/requst'
import { apiClient } from '@/lib/services/api'

export const Route = createFileRoute('/_authenticated/dashboard/admins/')({
  component: AdminsPage,
})

const LIMIT = 10

function AdminsPage() {
  const { data, isPending, page, setPage, isRefetching } = useGetAdminsData()
  const queryClient = useQueryClient()
  const rafIdRef = useRef<number | null>(null)

  const [sheetState, setSheetState] = useState<{
    open: boolean
    admin: TAdmin | null
  }>({ open: false, admin: null })
  const [isFormMounted, setIsFormMounted] = useState(false)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { mutate: mutateDeleteAdmin, isPending: isDeleting } = useCustomMutation<unknown, string>({
    key: ['admins', 'delete'],
    method: 'delete',
    requestFn: (id) =>
      request<unknown, undefined>(apiClient, 'delete', endpoints.admins.delete(id), undefined),
    onSuccess: () => {
      setDeleteId(null)
      handleRefresh()
    },
  })

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admins'], refetchType: 'active' })
  }, [queryClient])

  const scheduleFormMount = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
    }
    rafIdRef.current = requestAnimationFrame(() => {
      setIsFormMounted(true)
      rafIdRef.current = null
    })
  }, [])

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const openCreateSheet = useCallback(() => {
    setSheetState({ open: true, admin: null })
    scheduleFormMount()
  }, [scheduleFormMount])

  const openEditSheet = useCallback(
    (admin: TAdmin) => {
      setSheetState({ open: true, admin })
      scheduleFormMount()
    },
    [scheduleFormMount]
  )

  const closeSheet = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    setIsFormMounted(false)
    setSheetState({ open: false, admin: null })
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (deleteId) mutateDeleteAdmin(deleteId)
  }, [deleteId, mutateDeleteAdmin])

  const handleFormSuccess = useCallback(async () => {
    await handleRefresh()
    closeSheet()
  }, [handleRefresh, closeSheet])

  const tableColumns = useMemo(
    () => createColumns(page, LIMIT, setDeleteId, openEditSheet),
    [page, openEditSheet]
  )

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
      {isPending ? (
        <div className="flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <DataTable
          loading={isRefetching}
          columns={tableColumns}
          data={data?.data ?? []}
          total={data?.pages ?? 0}
          page={page}
          onPageChange={setPage}
        />
      )}  

      {/* Create / Edit Sheet */}
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
              onSuccess={handleFormSuccess}
              editId={editingAdmin?.id}
              defaultValues={editingDefaultValues}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
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
