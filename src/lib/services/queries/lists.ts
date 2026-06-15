import type {
  TAdmin,
  TCountry,
  TEmailEjs,
  TEmailTemplate,
  TEmailStatic,
  TLabel,
  TOrderStatus,
  TReleaseApp,
  TRole,
  TRoleClient,
  TRoleStatusAccessClient,
  TRoleStatusMapping,
  TSmtp,
} from '@/typescript'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { apiClient } from '../api'
import { endpoints } from '../endpoints'
import { DEFAULT_LIST_LIMIT, keys, LIST_STALE_TIME } from '../keys'
import { fetchData } from '../request'

const listQueryDefaults = {
  placeholderData: keepPreviousData,
  staleTime: LIST_STALE_TIME,
} as const

export const adminsListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.admins.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TAdmin[]>(apiClient, endpoints.admins.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const rolesListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.roles.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TRole[]>(apiClient, endpoints.roles.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const rolesClientListQuery = () =>
  queryOptions({
    queryKey: keys.rolesClient.list(),
    queryFn: ({ signal }) =>
      fetchData<TRoleClient[]>(apiClient, endpoints.rolesClient.getList(), { signal }),
    staleTime: 5 * 60 * 1000,
  })

export const labelListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.label.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TLabel[]>(apiClient, endpoints.label.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const countryListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.country.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TCountry[]>(apiClient, endpoints.country.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const orderStatusListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.orderStatus.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TOrderStatus[]>(apiClient, endpoints.orderStaus.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const orderStatusFindAllQuery = () =>
  queryOptions({
    queryKey: keys.orderStatus.findAll(),
    queryFn: ({ signal }) =>
      fetchData<TOrderStatus[]>(apiClient, endpoints.orderStaus.findAll(), { signal }),
    staleTime: 5 * 60 * 1000,
  })

export const roleStatusAccessListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.roleStatusAccess.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TRoleStatusAccessClient[]>(
        apiClient,
        endpoints.roleStatusAccess.list(page, limit),
        { signal }
      ),
    ...listQueryDefaults,
  })

export const roleStatusMappingListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.roleStatusMapping.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TRoleStatusMapping[]>(apiClient, endpoints.roleStatusMapping.list(page, limit), {
        signal,
      }),
    ...listQueryDefaults,
  })

export const releaseAppListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.releaseApp.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TReleaseApp[]>(apiClient, endpoints.releaseApp.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const emailSmtpListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.emailSMTP.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TSmtp[]>(apiClient, endpoints.emailSmtp.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const emailTemplateListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.emailTemplate.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TEmailTemplate[]>(apiClient, endpoints.emailTemplate.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const emailStaticListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.emailStatic.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TEmailStatic[]>(apiClient, endpoints.emailStatic.list(page, limit), { signal }),
    ...listQueryDefaults,
  })

export const emailEjsListQuery = (page: number, limit = DEFAULT_LIST_LIMIT) =>
  queryOptions({
    queryKey: keys.emailEjs.list(page, limit),
    queryFn: ({ signal }) =>
      fetchData<TEmailEjs[]>(apiClient, endpoints.emailEjs.list(page, limit), { signal }),
    ...listQueryDefaults,
  })
