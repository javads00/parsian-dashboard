import type { SmtpApiPayload, SmtpAuthType } from '@/typescript/requests/emailSetting'
import {
  omitMongoMetadata,
  toBoolean,
  toNumber,
  toOptionalNumber,
  toRequiredString,
  toString,
} from './normalizeMongoValue'

export type { SmtpApiPayload, SmtpAuthType }

export type SmtpFormInput = {
  host?: unknown
  type?: unknown
  OAUTH_Client_Secret?: unknown
  OAUTH_Client_ID?: unknown
  email?: unknown
  password?: unknown
  port?: unknown
  isServerEmail?: unknown
  isDeleted?: unknown
  refresh_Token?: unknown
  access_Token?: unknown
  expiry_date?: unknown
  _id?: unknown
  createdAt?: unknown
  updatedAt?: unknown
  __v?: unknown
}

function normalizeAuthType(type: unknown): SmtpAuthType {
  const normalized = String(type ?? '')
    .trim()
    .toLowerCase()

  if (normalized === 'oauth2') return 'OAuth2'
  return 'SMTP'
}

export function mapSmtpPayload(formData: SmtpFormInput): SmtpApiPayload {
  const source = omitMongoMetadata(formData as Record<string, unknown>)
  const type = normalizeAuthType(source.type)

  const payload: SmtpApiPayload = {
    host: toRequiredString(source.host, 'host'),
    type,
    OAUTH_Client_Secret: toString(source.OAUTH_Client_Secret),
    OAUTH_Client_ID: toString(source.OAUTH_Client_ID),
    email: toRequiredString(source.email, 'email'),
    password: toString(source.password),
    port: toNumber(source.port, 'port'),
    isServerEmail: toBoolean(source.isServerEmail),
    isDeleted: toBoolean(source.isDeleted),
    refresh_Token: toString(source.refresh_Token),
    access_Token: toString(source.access_Token),
    expiry_date: toOptionalNumber(source.expiry_date),
  }

  if (type === 'OAuth2') {
    toRequiredString(payload.OAUTH_Client_Secret, 'OAUTH_Client_Secret')
    toRequiredString(payload.OAUTH_Client_ID, 'OAUTH_Client_ID')
  } else {
    toRequiredString(payload.password, 'password')
  }

  return payload
}
