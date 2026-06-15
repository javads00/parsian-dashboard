import type { EmailEjsApiPayload } from '@/typescript/requests/emailSetting'
import {
  normalizeMongoId,
  omitMongoMetadata,
  toBoolean,
  toRequiredString,
} from './normalizeMongoValue'

export type { EmailEjsApiPayload }

export type EmailEjsFormInput = {
  subject?: unknown
  EJSName?: unknown
  name?: unknown
  emailId?: unknown
  isDeleted?: unknown
  _id?: unknown
  createdAt?: unknown
  updatedAt?: unknown
  __v?: unknown
}

function toRequiredMongoId(value: unknown, field: string): string {
  const id = normalizeMongoId(value)
  if (!id) throw new Error(`${field} is required`)
  return id
}

export function mapEmailEjsPayload(formData: EmailEjsFormInput, id?: string): EmailEjsApiPayload {
  const source = omitMongoMetadata(formData as Record<string, unknown>)

  const payload: EmailEjsApiPayload = {
    emailId: toRequiredMongoId(source.emailId, 'emailId'),
    subject: toRequiredString(source.subject, 'subject'),
    EJSName: toRequiredString(source.EJSName, 'EJSName'),
    name: toRequiredString(source.name, 'name'),
    isDeleted: toBoolean(source.isDeleted),
  }

  if (id) {
    payload.id = id
  }

  return payload
}
