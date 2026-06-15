import {
  Button,
  Card,
  CardContent,
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
import { RoleForm } from '@/features/role'
import { mergePermissionGroups } from '@/features/role/config/permissionGroups'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { useGetRolesData } from './hooks/-index'
import { columns } from './_components/columns'
import { deleteRoleMutation, keys, type RoleFormValues } from '@/lib'
import { cn } from '@/lib/utils'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import type { TRole } from '@/typescript'
import { AlertTriangle, Plus, Shield, Trash2 } from 'lucide-react'

type BackendSubMenu = {
  key: string
  label: string
  page?: { canView?: boolean }
  actions?: {
    canCreate?: boolean
    canEdit?: boolean
    canDelete?: boolean
    canRead?: boolean
  }
  components?: {
    table?: {
      canView?: boolean
      columns?: { key: string; canSort: boolean }[]
    }
    filters?: {
      canView?: boolean
      items?: { key: string; canUse: boolean }[]
    }
  }
}

type BackendPermission = TRole['permissions'][number] & {
  subMenus?: BackendSubMenu[]
}

export function RolesPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetRolesData()
  const queryClient = useQueryClient()
  const [sheet, setSheet] = useState<{ open: boolean; role: TRole | null }>({
    open: false,
    role: null,
  })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const isFormMounted = useDeferredMount(sheet.open)
  const isEmpty = !isInitialLoading && rows.length === 0
  const isEditing = Boolean(sheet.role)

  const deleteTarget = useMemo(
    () => rows.find((role) => role.id === deleteId) ?? null,
    [rows, deleteId]
  )

  const { mutate: deleteRole, isPending: isDeleting } = useMutation({
    mutationKey: [...keys.roles.all, 'delete'],
    mutationFn: (id: string) => {
      const { mutationFn } = deleteRoleMutation(id)
      if (!mutationFn) throw new Error('Missing deleteRole mutationFn')
      return mutationFn(undefined, {} as never)
    },
    meta: { toast: true },
    onSuccess: () => {
      setDeleteId(null)
      void queryClient.invalidateQueries({ queryKey: keys.roles.lists() })
    },
  })

  const openCreate = useCallback(() => setSheet({ open: true, role: null }), [])
  const openEdit = useCallback(
    (role: TRole) => setSheet({ open: true, role: normalizeEntityId(role) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, role: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })

  const handleDelete = useCallback(() => {
    if (deleteId) deleteRole(deleteId)
  }, [deleteId, deleteRole])

  const defaultValues = useMemo((): Partial<RoleFormValues> | undefined => {
    if (!sheet.role) return undefined

    return {
      name: sheet.role.name,
      fullAccess: sheet.role.fullAccess,
      permissions: mergePermissionGroups(
        (sheet.role.permissions ?? []).map((permission) => {
          const backendPermission = permission as BackendPermission

          return {
            resource: backendPermission.resource,
            page: { canView: backendPermission.page?.canView ?? false },
            actions: {
              canCreate: backendPermission.actions?.canCreate ?? false,
              canEdit: backendPermission.actions?.canEdit ?? false,
              canDelete: backendPermission.actions?.canDelete ?? false,
              canRead: backendPermission.actions?.canRead ?? false,
            },
            subMenus: (backendPermission.subMenus ?? []).map((sub) => ({
              key: sub.key,
              label: sub.label,
              page: { canView: sub.page?.canView ?? false },
              actions: {
                canCreate: sub.actions?.canCreate ?? false,
                canEdit: sub.actions?.canEdit ?? false,
                canDelete: sub.actions?.canDelete ?? false,
                canRead: sub.actions?.canRead ?? false,
              },
              components: {
                table: {
                  canView: sub.components?.table?.canView ?? false,
                  columns: sub.components?.table?.columns ?? [],
                },
                filters: {
                  canView: sub.components?.filters?.canView ?? false,
                  items: sub.components?.filters?.items ?? [],
                },
              },
            })),
          }
        }) as RoleFormValues['permissions']
      ),
    }
  }, [sheet.role])

  const permissionCount = sheet.role?.permissions?.length ?? 0

  return (
    <div className="w-full space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500">Manage admin roles and permissions</p>
        </div>

        <Button onClick={openCreate} className="shrink-0 shadow-sm">
          <Plus className="size-4" />
          Add Role
        </Button>
      </div>

      <div className="border-b border-gray-200" />

      {isEmpty ? (
        <Card className="rounded-xl border-gray-200/80 py-0 shadow-md">
          <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-gray-100">
              <Shield className="size-10 text-gray-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">No roles created yet</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Create your first role to manage admin permissions
            </p>
            <Button onClick={openCreate} className="mt-6 shadow-sm">
              <Plus className="size-4" />
              Create Role
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-xl border-gray-200/80 py-0 shadow-md">
          <CardContent className="p-0">
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
          </CardContent>
        </Card>
      )}

      <Sheet open={sheet.open} onOpenChange={(open) => !open && closeSheet()}>
        <SheetContent
          side="right"
          className={cn(
            'w-full overflow-y-auto border-t-4 sm:max-w-2xl',
            isEditing ? 'border-t-amber-500' : 'border-t-blue-500'
          )}
        >
          <SheetHeader className="space-y-3 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-lg',
                  isEditing ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                )}
              >
                <Shield className="size-5" strokeWidth={2} />
              </div>
              <div className="space-y-1 text-left">
                <SheetTitle className="text-xl">
                  {isEditing ? 'Edit Role' : 'Create Role'}
                </SheetTitle>
                <SheetDescription>
                  {isEditing
                    ? `Editing role with ${permissionCount} permission group${permissionCount === 1 ? '' : 's'}`
                    : 'Create a new role and configure its permission groups'}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {isFormMounted ? (
            <div className="pt-4">
              <RoleForm
                key={sheet.role?.id ?? 'create'}
                onCancel={closeSheet}
                onSuccess={closeSheet}
                defaultValues={defaultValues}
                editId={sheet.role?.id}
              />
            </div>
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="size-7 text-red-500" strokeWidth={2} />
            </div>

            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-lg">Delete Role</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-gray-500">
                Are you sure you want to delete the role{' '}
                <span className="font-semibold text-gray-900">
                  {deleteTarget?.name ?? 'this role'}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              loading={isDeleting}
              className="gap-2"
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
