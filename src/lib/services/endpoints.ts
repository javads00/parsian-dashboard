import type { EndpointEntry } from './type'

const API_URL = '/panel/v2'

export const endpoints = {
  auth: {
    login: () => `${API_URL}/Admin/login`,
  },

  admins: {
    list: (page: number, limit: number) => `${API_URL}/Admin/register-admin?page=${page}&limit=${limit}`,
    create: () => `${API_URL}/Admin/register-admin`,
    find: (id: string) => `${API_URL}/Admin/register-admin?id=${id}`,
    update: () => `${API_URL}/Admin/register-admin`,
    delete: (id: string) => `${API_URL}/Admin/register-admin?id=${id}`,
    createKey: () => ['admins', 'create'],
    deleteKey: (id: string) => ['admins', 'delete', id],
    key: (page: number, limit: number) => ['admins', page.toString(), limit.toString()],


    
  },

  roles: {
    list: () => `${API_URL}/RoleAdmin/list`,
    key: () => ['roles', 'list'],
  },





  orders: {
    list: (page: number, limit: number) => `${API_URL}/Order/test?page=${page}&limit=${limit}`,
    status: () => `${API_URL}/OrderStatus`,
    key: (page: number, limit: number) => ['orders', page.toString(), limit.toString()],
  },
} as const satisfies Record<string, Record<string, EndpointEntry>>
