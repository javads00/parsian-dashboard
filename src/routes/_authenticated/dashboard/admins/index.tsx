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
} from '@/components'
import { AdminForm } from '@/features/admins'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useGetAdminsData } from './hooks'
import { createColumns } from './_components/columns'
import { apiClient, endpoints, useCustomMutation } from '@/lib'







export const Route = createFileRoute('/_authenticated/dashboard/admins/')({
    component: AdminsPage,
})


function AdminsPage() {
    const { data, isPending, page, setPage } = useGetAdminsData()
    const limit = 10
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)


    const { mutate: mutateDeleteAdmin, isPending: isDeleting } = useCustomMutation<unknown, string>({
        key: ['admins', 'delete'],
        method: 'delete',
        url: endpoints.admins.delete(deleteId ?? '')
    })



    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
    }

    const handleDeleteConfirm = () => {
        if (deleteId) {
            mutateDeleteAdmin(deleteId)
        }
    }

    const tableColumns = createColumns(page, limit, handleDeleteClick)


    return (
        <div className="w-full space-y-4 overflow-hidden">
            <h1 className="text-2xl font-bold">Admins</h1>
            <Button onClick={() => setIsSheetOpen(true)}>Add Admin</Button>
            <DataTable
                loading={isPending}
                columns={tableColumns}
                data={data?.data || []}
                total={data?.pages || 0}
                page={page}
                onPageChange={setPage}
            />

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>Create New Admin</SheetTitle>
                        <SheetDescription>
                            Fill out the form below to create a new admin user.
                        </SheetDescription>
                    </SheetHeader>
                    <AdminForm
                        onCancel={() => setIsSheetOpen(false)}
                        onSuccess={() => setIsSheetOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Admin</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this admin? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            disabled={isDeleting}
                        >
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






