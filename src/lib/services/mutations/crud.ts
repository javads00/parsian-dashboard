import type { AdminFormProps, RoleFormValues, RoleStatusMappingFormProps } from '@/lib'
import type { CountryFormValues, LabelFormValues, OrderStatusFormValues } from '@/lib/schema'
import type { ReleaseAppFormValues } from '@/lib/schema/releaseApp.schema'
import type { EmailEjsApiPayload, EmailTemplateApiPayload, SmtpApiPayload } from '@/features/emailSetting/utils'
import type {
  TAdmin,
  TCountry,
  TEmailEjs,
  TEmailTemplate,
  TGlobalPayload,
  TLabel,
  TOrderStatus,
  TReleaseApp,
  TRole,
  TRoleStatusAccess,
  TRoleStatusAccessClient,
  TRoleStatusMapping,
  TSmtp,
} from '@/typescript'
import { mutationOptions } from '@tanstack/react-query'
import type { RoleStatusAccessApiPayload } from '@/features/roleStatusAccess/utils/toRoleStatusAccessPayload'
import { apiClient } from '../api'
import { endpoints } from '../endpoints'
import { keys } from '../keys'
import { deleteByUrl, deleteRequest, request } from '../request'

const toastMeta = { toast: true } as const

export const createAdminMutation = () =>
  mutationOptions({
    mutationKey: keys.admins.create(),
    mutationFn: (body: AdminFormProps) =>
      request<TAdmin, AdminFormProps>(apiClient, 'post', endpoints.admins.create(), body),
    meta: toastMeta,
  })

export const updateAdminMutation = () =>
  mutationOptions({
    mutationKey: keys.admins.update(),
    mutationFn: (body: AdminFormProps & { id: string }) =>
      request<TAdmin, AdminFormProps & { id: string }>(
        apiClient,
        'put',
        endpoints.admins.update(),
        body
      ),
    meta: toastMeta,
  })

export const deleteAdminMutation = (id: string) =>
  mutationOptions({
    mutationKey: keys.admins.delete(id),
    mutationFn: () => deleteByUrl<unknown>(apiClient, endpoints.admins.delete(id)),
    meta: toastMeta,
  })

export const createRoleMutation = () =>
  mutationOptions({
    mutationKey: keys.roles.create(),
    mutationFn: (body: RoleFormValues) =>
      request<TRole, RoleFormValues>(apiClient, 'post', endpoints.roles.create(), body),
    meta: toastMeta,
  })

export const updateRoleMutation = () =>
  mutationOptions({
    mutationKey: keys.roles.update(),
    mutationFn: ({ id, ...body }: RoleFormValues & { id: string }) =>
      request<TRole, RoleFormValues & { id: string }>(apiClient, 'put', endpoints.roles.update(), {
        ...body,
        id,
      }),
    meta: toastMeta,
  })

export const deleteRoleMutation = (id: string) =>
  mutationOptions({
    mutationKey: keys.roles.delete(id),
    mutationFn: () => deleteByUrl<TRole>(apiClient, endpoints.roles.delete(id)),
    meta: toastMeta,
  })

export const createLabelMutation = () =>
  mutationOptions({
    mutationKey: keys.label.create(),
    mutationFn: (body: LabelFormValues) =>
      request<TLabel, LabelFormValues>(apiClient, 'post', endpoints.label.create(), body),
    meta: toastMeta,
  })

export const updateLabelMutation = () =>
  mutationOptions({
    mutationKey: keys.label.update(),
    mutationFn: ({ id, ...body }: LabelFormValues & { id: string }) =>
      request<TLabel, LabelFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.label.update(),
        { ...body, id }
      ),
    meta: toastMeta,
  })

export const deleteLabelMutation = () =>
  mutationOptions({
    mutationKey: keys.label.delete(),
    mutationFn: (body: { id: string }) =>
      deleteRequest<void, { id: string }>(apiClient, endpoints.label.delete(), body),
    meta: toastMeta,
  })

export const createCountryMutation = () =>
  mutationOptions({
    mutationKey: keys.country.create(),
    mutationFn: (body: CountryFormValues) =>
      request<TCountry, CountryFormValues>(apiClient, 'post', endpoints.country.create(), body),
    meta: toastMeta,
  })

export const updateCountryMutation = () =>
  mutationOptions({
    mutationKey: keys.country.update(),
    mutationFn: ({ id, ...body }: CountryFormValues & { id: string }) =>
      request<TCountry, CountryFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.country.update(),
        { ...body, id }
      ),
    meta: toastMeta,
  })

export const deleteCountryMutation = () =>
  mutationOptions({
    mutationKey: keys.country.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.country.delete(), body),
    meta: toastMeta,
  })

export const createOrderStatusMutation = () =>
  mutationOptions({
    mutationKey: keys.orderStatus.create(),
    mutationFn: (body: OrderStatusFormValues) =>
      request<TOrderStatus, OrderStatusFormValues>(
        apiClient,
        'post',
        endpoints.orderStaus.create(),
        body
      ),
    meta: toastMeta,
  })

export const updateOrderStatusMutation = () =>
  mutationOptions({
    mutationKey: keys.orderStatus.update(),
    mutationFn: ({ id, ...body }: OrderStatusFormValues & { id: string }) =>
      request<TOrderStatus, OrderStatusFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.orderStaus.update(),
        { ...body, id }
      ),
    meta: toastMeta,
  })

export const deleteOrderStatusMutation = () =>
  mutationOptions({
    mutationKey: keys.orderStatus.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.orderStaus.delete(), body),
    meta: toastMeta,
  })

export const createRoleStatusAccessMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusAccess.create(),
    mutationFn: (body: RoleStatusAccessApiPayload) =>
      request<TRoleStatusAccessClient, RoleStatusAccessApiPayload>(
        apiClient,
        'post',
        endpoints.roleStatusAccess.create(),
        body
      ),
    meta: toastMeta,
  })

export const updateRoleStatusAccessMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusAccess.update(),
    mutationFn: ({ id, ...body }: RoleStatusAccessApiPayload & { id: string }) =>
      request<TRoleStatusAccess, RoleStatusAccessApiPayload & { id: string }>(
        apiClient,
        'put',
        endpoints.roleStatusAccess.update(),
        { ...body, id }
      ),
    meta: toastMeta,
  })

export const deleteRoleStatusAccessMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusAccess.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.roleStatusAccess.delete(), body),
    meta: toastMeta,
  })

export const createRoleStatusMappingMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusMapping.create(),
    mutationFn: (body: RoleStatusMappingFormProps) =>
      request<TRoleStatusAccessClient, RoleStatusMappingFormProps>(
        apiClient,
        'post',
        endpoints.roleStatusMapping.create(),
        body
      ),
    meta: toastMeta,
  })

export const updateRoleStatusMappingMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusMapping.update(),
    mutationFn: ({ id, ...body }: RoleStatusMappingFormProps & { id: string }) =>
      request<TRoleStatusMapping, RoleStatusMappingFormProps & { id: string }>(
        apiClient,
        'put',
        endpoints.roleStatusMapping.update(),
        { ...body, id }
      ),
    meta: toastMeta,
  })

export const deleteRoleStatusMappingMutation = () =>
  mutationOptions({
    mutationKey: keys.roleStatusMapping.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.roleStatusMapping.delete(), body),
    meta: toastMeta,
  })

export const createReleaseAppMutation = () =>
  mutationOptions({
    mutationKey: keys.releaseApp.create(),
    mutationFn: (body: ReleaseAppFormValues) =>
      request<TReleaseApp, ReleaseAppFormValues>(
        apiClient,
        'post',
        endpoints.releaseApp.create(),
        body
      ),
    meta: toastMeta,
  })

export const updateReleaseAppMutation = () =>
  mutationOptions({
    mutationKey: keys.releaseApp.update(),
    mutationFn: (body: ReleaseAppFormValues & { id: string }) =>
      request<TReleaseApp, ReleaseAppFormValues & { id: string }>(
        apiClient,
        'put',
        endpoints.releaseApp.update(),
        body
      ),
    meta: toastMeta,
  })

export const deleteReleaseAppMutation = () =>
  mutationOptions({
    mutationKey: keys.releaseApp.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.releaseApp.delete(), body),
    meta: toastMeta,
  })

export const createEmailSmtpMutation = () =>
  mutationOptions({
    mutationKey: keys.emailSMTP.create(),
    mutationFn: (body: SmtpApiPayload) =>
      request<TSmtp, SmtpApiPayload>(apiClient, 'post', endpoints.emailSmtp.create(), body),
    meta: toastMeta,
  })

export const updateEmailSmtpMutation = () =>
  mutationOptions({
    mutationKey: keys.emailSMTP.update(),
    mutationFn: (body: SmtpApiPayload & { id: string }) =>
      request<TSmtp, SmtpApiPayload & { id: string }>(
        apiClient,
        'put',
        endpoints.emailSmtp.update(),
        body
      ),
    meta: toastMeta,
  })

export const deleteEmailSmtpMutation = () =>
  mutationOptions({
    mutationKey: keys.emailSMTP.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.emailSmtp.delete(), body),
    meta: toastMeta,
  })

export const createEmailTemplateMutation = () =>
  mutationOptions({
    mutationKey: keys.emailTemplate.create(),
    mutationFn: (body: EmailTemplateApiPayload) =>
      request<TEmailTemplate, EmailTemplateApiPayload>(
        apiClient,
        'post',
        endpoints.emailTemplate.create(),
        body
      ),
    meta: toastMeta,
  })

export const updateEmailTemplateMutation = () =>
  mutationOptions({
    mutationKey: keys.emailTemplate.update(),
    mutationFn: (body: EmailTemplateApiPayload) =>
      request<TEmailTemplate, EmailTemplateApiPayload>(
        apiClient,
        'put',
        endpoints.emailTemplate.update(),
        body
      ),
    meta: toastMeta,
  })

export const deleteEmailTemplateMutation = () =>
  mutationOptions({
    mutationKey: keys.emailTemplate.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.emailTemplate.delete(), body),
    meta: toastMeta,
  })

export const createEmailEjsMutation = () =>
  mutationOptions({
    mutationKey: keys.emailEjs.create(),
    mutationFn: (body: EmailEjsApiPayload) =>
      request<TEmailEjs, EmailEjsApiPayload>(apiClient, 'post', endpoints.emailEjs.create(), body),
    meta: toastMeta,
  })

export const updateEmailEjsMutation = () =>
  mutationOptions({
    mutationKey: keys.emailEjs.update(),
    mutationFn: (body: EmailEjsApiPayload) =>
      request<TEmailEjs, EmailEjsApiPayload>(apiClient, 'put', endpoints.emailEjs.update(), body),
    meta: toastMeta,
  })

export const deleteEmailEjsMutation = () =>
  mutationOptions({
    mutationKey: keys.emailEjs.delete(),
    mutationFn: (body: TGlobalPayload) =>
      deleteRequest<void, TGlobalPayload>(apiClient, endpoints.emailEjs.delete(), body),
    meta: toastMeta,
  })
