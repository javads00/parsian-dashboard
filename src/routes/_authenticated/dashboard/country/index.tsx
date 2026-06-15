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
import { createFileRoute } from '@tanstack/react-router'
import { CountryForm } from '@/features/country'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { useDeleteCountry, useGetCountryData } from '@/features/country/hooks'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import { columns } from './_components/columns'
import type { TCountry } from '@/typescript'

export const Route = createFileRoute('/_authenticated/dashboard/country/')({
  component: CountryPage,
})

function CountryPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetCountryData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; country: TCountry | null }>({
    open: false,
    country: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, country: null }), [])
  const openEdit = useCallback(
    (country: TCountry) => setSheet({ open: true, country: normalizeEntityId(country) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, country: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteCountry, isPending: isDeleting } = useDeleteCountry()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteCountry({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteCountry])

  const defaultValues = useMemo(
    () => (sheet.country ? { name: sheet.country.name } : undefined),
    [sheet.country]
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Countries</h1>
        <Button onClick={openCreate}>Add Country</Button>
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
            <SheetTitle>{sheet.country ? 'Edit Country' : 'Create Country'}</SheetTitle>
            <SheetDescription>
              {sheet.country ? 'Update Country settings' : 'Create new Country with permissions'}
            </SheetDescription>
          </SheetHeader>

          {isFormMounted ? (
            <CountryForm
              key={sheet.country?.id ?? 'create'}
              onCancel={closeSheet}
              onSuccess={closeSheet}
              defaultValues={defaultValues}
              editId={sheet.country?.id}
            />
          ) : null}
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Country</DialogTitle>
            <DialogDescription>Are you sure you want to delete this country?</DialogDescription>
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
