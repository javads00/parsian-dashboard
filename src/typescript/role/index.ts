


export type Permission = {
    id: string
    resource: string
    actions: {
        canCreate: boolean
        canRead: boolean
        canEdit: boolean
        canDelete: boolean
    }
    components: {
        filters: {
            canView: boolean
            items: string[]
        }
        table: {
            canView: boolean
            columns: string[]
        }
    }
    createdAt: string
    updatedAt: string
}

export type Role = {
    id: string
    name: string
    fullAccess: boolean
    permissions: Permission[];
    createdAt: Date;
}




