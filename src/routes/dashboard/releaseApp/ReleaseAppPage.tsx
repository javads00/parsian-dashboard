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
import { ReleaseAppForm, useDeleteReleaseApp, useGetReleaseAppData } from '@/features/releaseApp'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TReleaseApp } from '@/typescript'

export function ReleaseAppPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetReleaseAppData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; releaseApp: TReleaseApp | null }>({
    open: false,
    releaseApp: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, releaseApp: null }), [])
  const openEdit = useCallback(
    (releaseApp: TReleaseApp) =>
      setSheet({ open: true, releaseApp: normalizeEntityId(releaseApp) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, releaseApp: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteReleaseApp, isPending: isDeleting } = useDeleteReleaseApp()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteReleaseApp({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteReleaseApp])

  const defaultValues = useMemo(() => {
    if (!sheet.releaseApp) return undefined
    const normalizePlatform = (p: unknown) => {
      if (typeof p !== 'string') return ''
      const v = p.trim()
      return v ? v.toLowerCase() : ''
    }
    return {
      appName: sheet.releaseApp.appName,
      platform: normalizePlatform(sheet.releaseApp.platform),
      version: sheet.releaseApp.version,
      previousVersion: sheet.releaseApp.previousVersion,
      buildNumber: sheet.releaseApp.buildNumber,
      downloadUrl: sheet.releaseApp.downloadUrl ?? '',
    }
  }, [sheet.releaseApp])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Release Apps</h1>
        <Button onClick={openCreate}>Add Release App</Button>
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
            <SheetTitle>{sheet.releaseApp ? 'Edit Release App' : 'Create Release App'}</SheetTitle>
            <SheetDescription>
              {sheet.releaseApp
                ? 'Update Release App settings'
                : 'Create new Release App with permissions'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <ReleaseAppForm
              key={sheet.releaseApp?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={defaultValues}
              editId={sheet.releaseApp?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Release App</DialogTitle>
            <DialogDescription>Are you sure you want to delete this release app?</DialogDescription>
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
