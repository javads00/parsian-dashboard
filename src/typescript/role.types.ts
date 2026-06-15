export type Resource =
  | 'Admin'
  | 'Role'
  | 'Label'
  | 'OrderStatus'
  | 'Country'
  | 'RoleStatusAccess'
  | 'RoleMapping'
  | 'Release'
  | 'UserList'
  | 'UserRoles'
  | 'UserActivity'
  | 'OrderList'
  | 'EmailSetting'
  | 'EmailSMTP'
  | 'EmailTemplates'

export type TColumn = {
  key: string
  canSort: boolean
}

export type TFilterItem = {
  key: string
  canUse: boolean
}

export type TSubMenu = {
  key: string
  label: string
  page: {
    canView: boolean
  }
  actions: {
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
    canRead: boolean
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
}

export type TPermission = {
  resource: Resource
  page: {
    canView: boolean
  }
  actions: {
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
    canRead: boolean
  }
  subMenus?: TSubMenu[]
  components?: {
    table: {
      canView: boolean
      columns: TColumn[]
    }
    filters: {
      canView: boolean
      items: TFilterItem[]
    }
  }
}
