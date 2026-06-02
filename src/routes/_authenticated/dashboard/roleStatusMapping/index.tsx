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

import { RoleStatusMappingForm } from '@/features/roleStatusMapping/component/roleMappingForm'

import { useDeleteRoleMapping } from '@/features/roleStatusMapping/hooks'
import { createColumns } from './_components/columns'

import type { TRoleStatusAccessClient, TRoleStatusMapping } from '@/typescript'
import { useGetRoleStatusMappingData } from '@/features/roleStatusMapping'
import { mapRoleStatusMappingToForm } from '@/features/roleStatusMapping/utils/mapRoleStatusAccessToForm'

export const Route = createFileRoute('/_authenticated/dashboard/roleStatusMapping/')({
  component: RoleStatusMappingPage,
})

function RoleStatusMappingPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetRoleStatusMappingData()
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

  const { mutate: deleteRoleStatusAccess, isPending: isDeleting } = useDeleteRoleMapping()

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
    return mapRoleStatusMappingToForm(sheet.roleStatusAccess as unknown as TRoleStatusMapping)
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

          <RoleStatusMappingForm
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
                    visibleAs: formDefaults.visibleAs,
                    originals: formDefaults.originals,
                  }
                : undefined
            }
            statusItemLabels={formDefaults?.originalItemLabels}
            editId={sheet.roleStatusAccess?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
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
