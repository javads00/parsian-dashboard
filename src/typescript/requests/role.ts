export type TColumn = {
  key: string
  canSort: boolean
}

export type TFilterItem = {
  key: string
  canUse: boolean
}

export type TPermission = {
  resource: 'User' | 'Role'
  page: {
    canView: boolean
  }
  components: {
    table: {
      canView: boolean
      columns: TColumn[]
    }
    filters: {
      canView: boolean
      items: TFilterItem[]
    }
  }
  actions: {
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
    canRead: boolean
  }
}

export type TRole = {
  id: string
  name: string
  fullAccess: boolean
  permissions: TPermission[]
  isDeleted: boolean
  deletedBy?: string
  createdAt: Date
  updatedAt: Date
}

export type TRoleClient = {
  id: string
  name: string
  key: string
  inOffice: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}
