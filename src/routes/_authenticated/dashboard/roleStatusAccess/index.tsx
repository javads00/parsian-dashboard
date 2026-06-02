import { useCallback, useMemo, useRef, useState } from 'react'
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

import { RoleStatusAccessForm } from '@/features/roleStatusAccess/component/roleStatusAccessForm'
import { mapRoleStatusAccessToForm } from '@/features/roleStatusAccess/utils/mapRoleStatusAccessToForm'

import {
  useDeleteRoleStatusAccess,
  useGetRoleStatusAccessData,
} from '@/features/roleStatusAccess/hooks'
import { createColumns } from './_components/columns'

import type { TRoleStatusAccessClient } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/roleStatusAccess/')({
  component: RoleStatusAccessPage,
})

function RoleStatusAccessPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetRoleStatusAccessData()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const rafRef = useRef<number | null>(null)

  const openCreate = useCallback(() => {
    setSheet({ open: true, roleStatusAccess: null })
  }, [])

  const [sheet, setSheet] = useState<{
    open: boolean
    roleStatusAccess: TRoleStatusAccessClient | null
  }>({
    open: false,
    roleStatusAccess: null,
  })

  const openEdit = useCallback((roleStatusAccess: TRoleStatusAccessClient) => {
    const normalizedRoleStatusAccess = roleStatusAccess as TRoleStatusAccessClient & {
      _id?: string
    }
    const normalizedId = normalizedRoleStatusAccess.id ?? normalizedRoleStatusAccess._id
    setSheet({
      open: true,
      roleStatusAccess: normalizedId
        ? ({ ...normalizedRoleStatusAccess, id: normalizedId } as TRoleStatusAccessClient)
        : normalizedRoleStatusAccess,
    })
  }, [])

  const closeSheet = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null

    setSheet({ open: false, roleStatusAccess: null })
  }, [])

  /* ---------------------------
     memoized columns
  ----------------------------*/
  const columns = useMemo(
    () => createColumns(page, 10, undefined, openEdit, setDeleteId),
    [page, openEdit]
  )

  const { mutate: deleteRoleStatusAccess, isPending: isDeleting } = useDeleteRoleStatusAccess()

  const handleDelete = useCallback(() => {
    if (!deleteId) return

    deleteRoleStatusAccess(
      { id: deleteId },
      {
        onSuccess: async () => {
          await refetch()
          setDeleteId(null)
        },
      }
    )
  }, [deleteId, deleteRoleStatusAccess, refetch])

  const formDefaults = useMemo(() => {
    if (!sheet.roleStatusAccess) return undefined
    return mapRoleStatusAccessToForm(sheet.roleStatusAccess)
  }, [sheet.roleStatusAccess])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Role Status Access</h1>
        <Button onClick={openCreate}>Add Role Status Access</Button>
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
            <SheetTitle>
              {sheet.roleStatusAccess ? 'Edit Role Status Access' : 'Create Role Status Access'}
            </SheetTitle>
            <SheetDescription>
              {sheet.roleStatusAccess
                ? 'Update Role Status Access settings'
                : 'Create new Role Status Access with permissions'}
            </SheetDescription>
          </SheetHeader>

          <RoleStatusAccessForm
            key={sheet.roleStatusAccess?.id ?? 'create'}
            onCancel={closeSheet}
            onSuccess={async () => {
              await refetch()
              closeSheet()
            }}
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
            editId={sheet.roleStatusAccess?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
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
