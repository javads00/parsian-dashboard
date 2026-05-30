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

import { CountryForm } from '@/features/country'

import { useDeleteCountry, useGetCountryData } from '@/features/country/hooks'
import { createColumns } from './_components/columns'

import type { TCountry } from '@/typescript'

function CountryPage() {
  const { data, isPending, page, setPage, refetch, dataUpdatedAt } = useGetCountryData()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const rafRef = useRef<number | null>(null)

  const openCreate = useCallback(() => {
    setSheet({ open: true, country: null })
  }, [])

  const [sheet, setSheet] = useState<{
    open: boolean
    country: TCountry | null
  }>({
    open: false,
    country: null,
  })

  const openEdit = useCallback((country: TCountry) => {
    const normalizedCountry = country as TCountry & { _id?: string }
    const normalizedId = normalizedCountry.id ?? normalizedCountry._id
    setSheet({
      open: true,
      country: normalizedId
        ? ({ ...normalizedCountry, id: normalizedId } as TCountry)
        : normalizedCountry,
    })
  }, [])

  const closeSheet = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null

    setSheet({ open: false, country: null })
  }, [])

  /* ---------------------------
     memoized columns
  ----------------------------*/
  const columns = useMemo(
    () => createColumns(page, 10, undefined, openEdit, setDeleteId),
    [page, openEdit]
  )

  const { mutate: deleteCountry, isPending: isDeleting } = useDeleteCountry()

  const handleDelete = useCallback(() => {
    if (!deleteId) return

    deleteCountry(
      { id: deleteId },
      {
        onSuccess: async () => {
          await refetch()
          setDeleteId(null)
        },
      }
    )
  }, [deleteId, deleteCountry, refetch])

  const defaultValues = useMemo(() => {
    if (!sheet.country) return undefined
    return {
      name: sheet.country.name,
    }
  }, [sheet.country])

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Countries</h1>
        <Button onClick={openCreate}>Add Country</Button>
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
            <SheetTitle>{sheet.country ? 'Edit Country' : 'Create Country'}</SheetTitle>
            <SheetDescription>
              {sheet.country ? 'Update Country settings' : 'Create new Country with permissions'}
            </SheetDescription>
          </SheetHeader>

          <CountryForm
            key={sheet.country?.id ?? 'create'}
            onCancel={closeSheet}
            onSuccess={async () => {
              await refetch()
              closeSheet()
            }}
            defaultValues={defaultValues}
            editId={sheet.country?.id}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
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

export const Route = createFileRoute('/_authenticated/dashboard/country/')({
  component: CountryPage,
})
