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

import { ReleaseAppForm, useDeleteReleaseApp, useGetReleaseAppData } from '@/features/releaseApp'

import { createColumns } from './_components/columns'

import type { TReleaseApp } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/releaseApp/')({
  component: ReleaseAppPage,
})

function ReleaseAppPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetReleaseAppData()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const rafRef = useRef<number | null>(null)

  const openCreate = useCallback(() => {
    setSheet({ open: true, releaseApp: null })
  }, [])

  const [sheet, setSheet] = useState<{
    open: boolean
    releaseApp: TReleaseApp | null
  }>({
    open: false,
    releaseApp: null,
  })

  const openEdit = useCallback((releaseApp: TReleaseApp) => {
    const normalizedReleaseApp = releaseApp as TReleaseApp & { _id?: string }
    const normalizedId = normalizedReleaseApp.id ?? normalizedReleaseApp._id
    setSheet({
      open: true,
      releaseApp: normalizedId
        ? ({ ...normalizedReleaseApp, id: normalizedId } as TReleaseApp)
        : normalizedReleaseApp,
    })
  }, [])

  const closeSheet = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null

    setSheet({ open: false, releaseApp: null })
  }, [])

  /* ---------------------------
     memoized columns
  ----------------------------*/
  const columns = useMemo(
    () => createColumns(page, 10, undefined, openEdit, setDeleteId),
    [page, openEdit]
  )

  const { mutate: deleteReleaseApp, isPending: isDeleting } = useDeleteReleaseApp()

  const handleDelete = useCallback(() => {
    if (!deleteId) return

    deleteReleaseApp(
      { id: deleteId },
      {
        onSuccess: async () => {
          await refetch()
          setDeleteId(null)
        },
      }
    )
  }, [deleteId, deleteReleaseApp, refetch])

  const defaultValues = useMemo(() => {
    if (!sheet.releaseApp) return undefined
    const normalizePlatform = (p: unknown) => {
      if (typeof p !== 'string') return ''
      const v = p.trim()
      if (!v) return ''
      // backend might return IOS/ANDROID/WEB, while the form expects ios/android/web
      return v.toLowerCase()
    }
    return {
      appName: sheet.releaseApp.appName,
      platform: normalizePlatform(sheet.releaseApp.platform),
      version: sheet.releaseApp.version,
      previousVersion: sheet.releaseApp.previousVersion,
      buildNumber: sheet.releaseApp.buildNumber,
      downloadUrl: sheet.releaseApp.downloadUrl ?? '',
    }
  }, [
    sheet.releaseApp?.appName,
    sheet.releaseApp?.platform,
    sheet.releaseApp?.version,
    sheet.releaseApp?.previousVersion,
    sheet.releaseApp?.buildNumber,
    sheet.releaseApp?.downloadUrl,
  ])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Release Apps</h1>
        <Button onClick={openCreate}>Add Release App</Button>
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
            <SheetTitle>{sheet.releaseApp ? 'Edit Release App' : 'Create Release App'}</SheetTitle>
            <SheetDescription>
              {sheet.releaseApp
                ? 'Update Release App settings'
                : 'Create new Release App with permissions'}
            </SheetDescription>
          </SheetHeader>

          <ReleaseAppForm
            key={sheet.releaseApp?.id ?? 'create'}
            onCancel={closeSheet}
            onSuccess={async () => {
              await refetch()
              closeSheet()
            }}
            defaultValues={defaultValues}
            editId={sheet.releaseApp?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Label</DialogTitle>
            <DialogDescription>Are you sure you want to delete this label?</DialogDescription>
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
