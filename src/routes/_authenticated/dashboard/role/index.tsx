import { DataTable } from '@/components'
import { createFileRoute } from '@tanstack/react-router'
import { useGetAdminsData } from './hooks'
import { createColumns } from './_components/columns'







export const Route = createFileRoute('/_authenticated/dashboard/role/')({
    component: RolesPage,

})


function RolesPage() {
    const { data, isPending, page, setPage } = useGetAdminsData()
    const limit = 10
    const tableColumns = createColumns(page, limit)

    return (
        <div className="w-full space-y-4 overflow-hidden">
            <h1 className="text-2xl font-bold">Admins</h1>
            <DataTable
                loading={isPending}
                columns={tableColumns}
                data={data?.data || []}
                total={data?.pages || 0}
                page={page}
                onPageChange={setPage}
            />
        </div>
    )
}






