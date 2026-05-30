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
    create: () => `${API_URL}/RoleAdmin`,
    update: () => `${API_URL}/RoleAdmin`,
    delete: (id: string) => `${API_URL}/RoleAdmin?id=${id}`,
    key: (page: number, limit: number) => ['roles', page.toString(), limit.toString()],
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
    update: () => `${API_URL}/OrderStatus`,
    delete: () => `${API_URL}/OrderStatus`,
    createKey: () => ['OrderStatus', 'create'],
    deleteKey: (id: string) => ['OrderStatus', 'delete', id],
    key: (page: number, limit: number) => ['OrderStatus', page.toString(), limit.toString()],
  },

  orders: {
    list: (page: number, limit: number) => `${API_URL}/Order/test?page=${page}&limit=${limit}`,
    status: () => `${API_URL}/OrderStatus`,
    key: (page: number, limit: number) => ['orders', page.toString(), limit.toString()],
  },
} as const satisfies Record<string, Record<string, EndpointEntry>>

export const adminQueryKeys = {
  all: ['admins'] as const,
  list: () => [...adminQueryKeys.all, 'list'] as const,
  listPage: (page: number, filters?: Record<string, unknown>) =>
    [...adminQueryKeys.list(), { page, ...(filters ?? {}) }] as const,
}
