export const DEFAULT_LIST_LIMIT = 50
export const LIST_STALE_TIME = 30_000

export const keys = {
  auth: {
    signIn: () => ['auth', 'signIn'] as const,
  },

  admins: {
    all: ['admins'] as const,
    lists: () => [...keys.admins.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.admins.lists(), { page, limit }] as const,
    create: () => [...keys.admins.all, 'create'] as const,
    update: () => [...keys.admins.all, 'update'] as const,
    delete: (id: string) => [...keys.admins.all, 'delete', id] as const,
  },

  roles: {
    all: ['roles'] as const,
    lists: () => [...keys.roles.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.roles.lists(), { page, limit }] as const,
    allRoles: () => [...keys.roles.all, 'all'] as const,
    create: () => [...keys.roles.all, 'create'] as const,
    update: () => [...keys.roles.all, 'update'] as const,
    delete: (id: string) => [...keys.roles.all, 'delete', id] as const,
  },

  rolesClient: {
    all: ['rolesClient'] as const,
    list: () => [...keys.rolesClient.all, 'list'] as const,
  },

  label: {
    all: ['label'] as const,
    lists: () => [...keys.label.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.label.lists(), { page, limit }] as const,
    create: () => [...keys.label.all, 'create'] as const,
    update: () => [...keys.label.all, 'update'] as const,
    delete: () => [...keys.label.all, 'delete'] as const,
  },

  country: {
    all: ['country'] as const,
    lists: () => [...keys.country.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.country.lists(), { page, limit }] as const,
    create: () => [...keys.country.all, 'create'] as const,
    update: () => [...keys.country.all, 'update'] as const,
    delete: () => [...keys.country.all, 'delete'] as const,
  },

  orderStatus: {
    all: ['orderStatus'] as const,
    lists: () => [...keys.orderStatus.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.orderStatus.lists(), { page, limit }] as const,
    findAll: () => [...keys.orderStatus.all, 'findAll'] as const,
    create: () => [...keys.orderStatus.all, 'create'] as const,
    update: () => [...keys.orderStatus.all, 'update'] as const,
    delete: () => [...keys.orderStatus.all, 'delete'] as const,
  },

  roleStatusAccess: {
    all: ['roleStatusAccess'] as const,
    lists: () => [...keys.roleStatusAccess.all, 'list'] as const,
    list: (page: number, limit: number) =>
      [...keys.roleStatusAccess.lists(), { page, limit }] as const,
    create: () => [...keys.roleStatusAccess.all, 'create'] as const,
    update: () => [...keys.roleStatusAccess.all, 'update'] as const,
    delete: () => [...keys.roleStatusAccess.all, 'delete'] as const,
  },

  roleStatusMapping: {
    all: ['roleStatusMapping'] as const,
    lists: () => [...keys.roleStatusMapping.all, 'list'] as const,
    list: (page: number, limit: number) =>
      [...keys.roleStatusMapping.lists(), { page, limit }] as const,
    create: () => [...keys.roleStatusMapping.all, 'create'] as const,
    update: () => [...keys.roleStatusMapping.all, 'update'] as const,
    delete: () => [...keys.roleStatusMapping.all, 'delete'] as const,
  },

  releaseApp: {
    all: ['releaseApp'] as const,
    lists: () => [...keys.releaseApp.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.releaseApp.lists(), { page, limit }] as const,
    create: () => [...keys.releaseApp.all, 'create'] as const,
    update: () => [...keys.releaseApp.all, 'update'] as const,
    delete: () => [...keys.releaseApp.all, 'delete'] as const,
  },

  emailSMTP: {
    all: ['emailSMTP'] as const,
    lists: () => [...keys.emailSMTP.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.emailSMTP.lists(), { page, limit }] as const,
    create: () => [...keys.emailSMTP.all, 'create'] as const,
    update: () => [...keys.emailSMTP.all, 'update'] as const,
    delete: () => [...keys.emailSMTP.all, 'delete'] as const,
  },

  emailTemplate: {
    all: ['emailTemplate'] as const,
    lists: () => [...keys.emailTemplate.all, 'list'] as const,
    list: (page: number, limit: number) =>
      [...keys.emailTemplate.lists(), { page, limit }] as const,
    create: () => [...keys.emailTemplate.all, 'create'] as const,
    update: () => [...keys.emailTemplate.all, 'update'] as const,
    delete: () => [...keys.emailTemplate.all, 'delete'] as const,
  },

  emailStatic: {
    all: ['emailStatic'] as const,
    lists: () => [...keys.emailStatic.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.emailStatic.lists(), { page, limit }] as const,
    options: () => [...keys.emailStatic.all, 'options'] as const,
  },

  emailEjs: {
    all: ['emailEjs'] as const,
    lists: () => [...keys.emailEjs.all, 'list'] as const,
    list: (page: number, limit: number) => [...keys.emailEjs.lists(), { page, limit }] as const,
    create: () => [...keys.emailEjs.all, 'create'] as const,
    update: () => [...keys.emailEjs.all, 'update'] as const,
    delete: () => [...keys.emailEjs.all, 'delete'] as const,
  },
} as const
