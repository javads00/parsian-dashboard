import type { SmtpAuthType } from '@/typescript/requests/emailSetting'
import type { SmtpFormValues } from '@/lib/schema/smtp.schema'
import type { SmtpFormInput } from './mapSmtpPayload'
import { normalizeMongoNumber, toBoolean, toString } from './normalizeMongoValue'

function normalizeAuthType(type: unknown): SmtpAuthType {
  const normalized = String(type ?? '')
    .trim()
    .toLowerCase()

  if (normalized === 'oauth2') return 'OAuth2'
  return 'SMTP'
}

export function mapSmtpToFormValues(data: SmtpFormInput): SmtpFormValues {
  return {
    host: toString(data.host),
    type: normalizeAuthType(data.type),
    OAUTH_Client_Secret: toString(data.OAUTH_Client_Secret),
    OAUTH_Client_ID: toString(data.OAUTH_Client_ID),
    email: toString(data.email),
    password: toString(data.password),
    port: normalizeMongoNumber(data.port) ?? 465,
    isServerEmail: toBoolean(data.isServerEmail),
    isDeleted: toBoolean(data.isDeleted),
    refresh_Token: toString(data.refresh_Token),
    access_Token: toString(data.access_Token),
    expiry_date: normalizeMongoNumber(data.expiry_date) ?? 0,
  }
}
