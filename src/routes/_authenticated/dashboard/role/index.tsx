import {
  Button,
  DataTable,
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
  Skeleton,
} from '@/components'

import { RoleForm } from '@/features/role'
import { createFileRoute } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'

import { useGetAdminsData } from './hooks/-index'
import { createColumns } from './_components/columns'
import { endpoints } from '@/lib/services/endpoints'
import { useCustomMutation } from '@/lib/services/useMutation'

import { request } from '@/lib/services/requst'
import { apiClient } from '@/lib/services/api'
import type { RoleFormValues } from '@/lib'
import type { TRole } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/role/')({
  component: RolesPage,
})

function RolesPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetAdminsData()
  const queryClient = useQueryClient()

  const rafRef = useRef<number | null>(null)

  const [sheet, setSheet] = useState<{
    open: boolean
    role: TRole | null
  }>({
    open: false,
    role: null,
  })

  const [deleteId, setDeleteId] = useState<string | null>(null)

  /* ---------------------------
     helpers
  ----------------------------*/
  const invalidateRoles = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ['roles'],
    })
  }, [queryClient])

  const { mutate: deleteRole, isPending: isDeleting } = useCustomMutation<unknown, string>({
    method: 'delete',
    key: ['roles', 'delete'],
    requestFn: (id) => request(apiClient, 'delete', endpoints.roles.delete(id), undefined),
    onSuccess: () => {
      setDeleteId(null)
      void invalidateRoles()
    },
  })

  const openCreate = useCallback(() => {
    setSheet({ open: true, role: null })
  }, [])

  const openEdit = useCallback((role: TRole) => {
    const normalizedRole = role as TRole & { _id?: string }
    const normalizedId = normalizedRole.id ?? normalizedRole._id

    setSheet({
      open: true,
      role: normalizedId ? ({ ...normalizedRole, id: normalizedId } as TRole) : normalizedRole,
    })
  }, [])

  const closeSheet = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null

    setSheet({ open: false, role: null })
  }, [])

  const handleDelete = useCallback(() => {
    if (deleteId) deleteRole(deleteId)
  }, [deleteId, deleteRole])

  /* ---------------------------
     memoized columns
  ----------------------------*/
  const columns = useMemo(
    () => createColumns(page, 10, undefined, openEdit, setDeleteId),
    [page, openEdit]
  )

  const defaultValues = useMemo((): Partial<RoleFormValues> | undefined => {
    if (!sheet.role) return undefined

    return {
      name: sheet.role.name,
      fullAccess: sheet.role.fullAccess,
      permissions: (sheet.role.permissions ?? []).map((permission) => ({
        resource: permission.resource === 'Role' ? 'Role' : 'Admin',
        page: { canView: permission.page?.canView ?? false },
        components: {
          table: {
            canView: permission.components?.table?.canView ?? false,
            columns: permission.components?.table?.columns ?? [],
          },
          filters: {
            canView: permission.components?.filters?.canView ?? false,
            items: permission.components?.filters?.items ?? [],
          },
        },
        actions: {
          canCreate: permission.actions?.canCreate ?? false,
          canEdit: permission.actions?.canEdit ?? false,
          canDelete: permission.actions?.canDelete ?? false,
          canRead: permission.actions?.canRead ?? false,
        },
      })),
    }
  }, [sheet.role])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles</h1>

        <Button onClick={openCreate}>Add Role</Button>
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
            <SheetTitle>{sheet.role ? 'Edit Role' : 'Create Role'}</SheetTitle>
            <SheetDescription>
              {sheet.role ? 'Update role settings' : 'Create new role with permissions'}
            </SheetDescription>
          </SheetHeader>

          <RoleForm
            key={sheet.role?.id ?? 'create'}
            onCancel={closeSheet}
            onSuccess={async () => {
              await refetch()
              closeSheet()
            }}
            defaultValues={defaultValues}
            editId={sheet.role?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>Are you sure you want to delete this role?</DialogDescription>
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
