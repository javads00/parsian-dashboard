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
import {
  EmailTemplatesForm,
  mapEmailTemplateToFormValues,
  useDeleteEmailTemplate,
  useGetEmailTemplatesData,
} from '@/features/emailSetting'
import { useCallback, useMemo, useState } from 'react'
import { useDeferredMount } from '@/hooks/useDeferredMount'
import { useStableHandlers } from '@/hooks/useStableHandlers'
import { normalizeEntityId } from '@/lib/utils/normalizeEntityId'
import type { EmailTemplateFormValues } from '@/lib/schema/emailTemplate.schema'
import { columns } from './_components/columns'
import type { TEmailTemplate } from '@/typescript'

export function EmailTemplatesPage() {
  const { rows, page, setPage, limit, totalPages, isInitialLoading } = useGetEmailTemplatesData()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<{ open: boolean; template: TEmailTemplate | null }>({
    open: false,
    template: null,
  })

  const isFormMounted = useDeferredMount(sheet.open)

  const openCreate = useCallback(() => setSheet({ open: true, template: null }), [])
  const openEdit = useCallback(
    (template: TEmailTemplate) =>
      setSheet({ open: true, template: normalizeEntityId(template) }),
    []
  )
  const closeSheet = useCallback(() => setSheet({ open: false, template: null }), [])

  const tableHandlers = useStableHandlers({ onEdit: openEdit, onDelete: setDeleteId })
  const { mutate: deleteEmailTemplate, isPending: isDeleting } = useDeleteEmailTemplate()

  const handleDelete = useCallback(() => {
    if (!deleteId) return
    deleteEmailTemplate({ id: deleteId }, { onSuccess: () => setDeleteId(null) })
  }, [deleteId, deleteEmailTemplate])

  const defaultValues = useMemo<Partial<EmailTemplateFormValues> | undefined>(() => {
    if (!sheet.template) return undefined
    return mapEmailTemplateToFormValues(sheet.template)
  }, [sheet.template])

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Templates</h1>
        <Button onClick={openCreate}>Add Email Template</Button>
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
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-3xl">
          <SheetHeader className="shrink-0 border-b px-6 py-5">
            <SheetTitle>
              {sheet.template ? 'Edit Email Template' : 'Create Email Template'}
            </SheetTitle>
            <SheetDescription>
              {sheet.template
                ? 'Update email template content and SMTP link'
                : 'Create a new email template'}
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-hidden">
            {isFormMounted ? (
              <EmailTemplatesForm
                key={sheet.template?.id ?? 'create'}
                onCancel={closeSheet}
                onSuccess={closeSheet}
                defaultValues={defaultValues}
                editId={sheet.template?.id}
              />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Email Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this email template?
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
