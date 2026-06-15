import type { EndpointEntry } from './type'

const API_URL = 'panel/v2'

export const endpoints = {
  auth: {
    login: () => `${API_URL}/Admin/login`,
  },

  admins: {
    list: (page: number, limit: number) =>
      `${API_URL}/Admin/register-admin?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Admin/register-admin`,
    find: (id: string) => `${API_URL}/Admin/register-admin?id=${id}`,
    update: () => `${API_URL}/Admin/register-admin`,
    delete: (id: string) => `${API_URL}/Admin/register-admin?id=${id}`,
    createKey: () => ['admins', 'create'],
    deleteKey: (id: string) => ['admins', 'delete', id],
    key: (page: number, limit: number) => ['admins', page.toString(), limit.toString()],
  },

  roles: {
    createKey: () => ['roles', 'create'],
    list: (page: number, limit: number) => `${API_URL}/RoleAdmin/list?page=${page}&limit=${limit}`,
    all: () => `${API_URL}/RoleAdmin/list`,
    allKey: () => ['roles', 'all'],

    create: () => `${API_URL}/RoleAdmin`,
    update: () => `${API_URL}/RoleAdmin`,
    delete: (id: string) => `${API_URL}/RoleAdmin?id=${id}`,
    key: (page: number, limit: number) => ['roles', page.toString(), limit.toString()],
  },

  rolesClient: {
    getList: () => `${API_URL}/Role`,
    getListKey: () => ['roles', 'getList'],
  },

  label: {
    list: (page: number, limit: number) => `${API_URL}/Label?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Label`,
    find: (id: string) => `${API_URL}/Label?id=${id}`,
    update: () => `${API_URL}/Label`,
    delete: () => `${API_URL}/Label`,
    createKey: () => ['label', 'create'],
    deleteKey: (id: string) => ['label', 'delete', id],
    key: (page: number, limit: number) => ['label', page.toString(), limit.toString()],
  },

  country: {
    list: (page: number, limit: number) => `${API_URL}/Country?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Country`,
    find: (id: string) => `${API_URL}/Country?id=${id}`,
    update: () => `${API_URL}/Country`,
    delete: () => `${API_URL}/Country`,
    createKey: () => ['country', 'create'],
    deleteKey: (id: string) => ['country', 'delete', id],
    updateKey: () => ['country', 'update'],
    key: (page: number, limit: number) => ['country', page.toString(), limit.toString()],
  },

  orderStaus: {
    list: (page: number, limit: number) => `${API_URL}/OrderStatus?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/OrderStatus`,
    find: (id: string) => `${API_URL}/OrderStatus?id=${id}`,
    findAll: () => `${API_URL}/OrderStatus/all`,
    update: () => `${API_URL}/OrderStatus`,
    delete: () => `${API_URL}/OrderStatus`,
    createKey: () => ['OrderStatus', 'create'],
    deleteKey: (id: string) => ['OrderStatus', 'delete', id],
    findAllKey: () => ['OrderStatus', 'findAll'],
    key: (page: number, limit: number) => ['OrderStatus', page.toString(), limit.toString()],
  },

  roleStatusAccess: {
    list: (page: number, limit: number) =>
      `${API_URL}/RoleStatusAccess?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/RoleStatusAccess`,
    find: (id: string) => `${API_URL}/RoleStatusAccess?id=${id}`,
    update: () => `${API_URL}/RoleStatusAccess`,
    delete: () => `${API_URL}/RoleStatusAccess`,
    createKey: () => ['RoleStatusAccess', 'create'],
    deleteKey: (id: string) => ['RoleStatusAccess', 'delete', id],
    key: (page: number, limit: number) => ['RoleStatusAccess', page.toString(), limit.toString()],
  },

  roleStatusMapping: {
    list: (page: number, limit: number) =>
      `${API_URL}/RoleStatusMapping?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/RoleStatusMapping`,
    find: (id: string) => `${API_URL}/RoleStatusMapping?id=${id}`,
    update: () => `${API_URL}/RoleStatusMapping`,
    delete: () => `${API_URL}/RoleStatusMapping`,
    createKey: () => ['RoleStatusMapping', 'create'],
    deleteKey: (id: string) => ['RoleStatusMapping', 'delete', id],
    key: (page: number, limit: number) => ['RoleStatusMapping', page.toString(), limit.toString()],
  },

  orders: {
    list: (page: number, limit: number) => `${API_URL}/Order/test?page=${page}&limit=${limit}`,
    status: () => `${API_URL}/OrderStatus`,
    key: (page: number, limit: number) => ['orders', page.toString(), limit.toString()],
  },

  releaseApp: {
    list: (page: number, limit: number) => `${API_URL}/Release?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Release`,
    find: (id: string) => `${API_URL}/Release?id=${id}`,
    update: () => `${API_URL}/Release`,
    delete: () => `${API_URL}/Release`,
    createKey: () => ['Release', 'create'],
    deleteKey: () => ['Release', 'delete'],
    key: (page: number, limit: number) => ['Release', page.toString(), limit.toString()],
  },

  emailSmtp: {
    list: (page: number, limit: number) => `${API_URL}/Email?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Email`,
    find: (id: string) => `${API_URL}/Email?id=${id}`,
    update: () => `${API_URL}/Email`,
    delete: () => `${API_URL}/Email`,
    createKey: () => ['Email', 'create'],
    deleteKey: () => ['Email', 'delete'],
    key: (page: number, limit: number) => ['Email', page.toString(), limit.toString()],
  },

  emailTemplate: {
    list: (page: number, limit: number) => `${API_URL}/EmailTemplate?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/EmailTemplate`,
    find: (id: string) => `${API_URL}/EmailTemplate?id=${id}`,
    update: () => `${API_URL}/EmailTemplate`,
    delete: () => `${API_URL}/EmailTemplate`,
    createKey: () => ['EmailTemplate', 'create'],
    deleteKey: () => ['EmailTemplate', 'delete'],
    key: (page: number, limit: number) => ['EmailTemplate', page.toString(), limit.toString()],
  },

  emailStatic: {
    list: (page: number, limit: number) => `${API_URL}/EmailStatic?page=${page}&limit=${limit}`,
    find: (id: string) => `${API_URL}/EmailStatic?id=${id}`,
    key: (page: number, limit: number) => ['EmailStatic', page.toString(), limit.toString()],
  },

  emailEjs: {
    list: (page: number, limit: number) => `${API_URL}/EmailEJS?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/EmailEJS`,
    find: (id: string) => `${API_URL}/EmailEJS?id=${id}`,
    update: () => `${API_URL}/EmailEJS`,
    delete: () => `${API_URL}/EmailEJS`,
    createKey: () => ['EmailEJS', 'create'],
    deleteKey: () => ['EmailEJS', 'delete'],
    key: (page: number, limit: number) => ['EmailEJS', page.toString(), limit.toString()],
  },
} as const satisfies Record<string, Record<string, EndpointEntry>>

export const adminQueryKeys = {
  all: ['admins'] as const,
  list: () => [...adminQueryKeys.all, 'list'] as const,
  listPage: (page: number, filters?: Record<string, unknown>) =>
    [...adminQueryKeys.list(), { page, ...(filters ?? {}) }] as const,
}
