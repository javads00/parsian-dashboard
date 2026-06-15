import type { EmailTemplateApiPayload } from '@/typescript/requests/emailSetting'
import {
  normalizeMongoId,
  omitMongoMetadata,
  toBoolean,
  toNullableString,
  toRequiredString,
  toString,
} from './normalizeMongoValue'

export type { EmailTemplateApiPayload }

export type EmailTemplateFormInput = {
  subject?: unknown
  emailId?: unknown
  emailStaticId?: unknown
  discretion?: unknown
  firstParagraph?: unknown
  secondParagraph?: unknown
  thirdParagraph?: unknown
  isDeleted?: unknown
  deletedBy?: unknown
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

export function mapEmailTemplatePayload(
  formData: EmailTemplateFormInput,
  id?: string
): EmailTemplateApiPayload {
  const source = omitMongoMetadata(formData as Record<string, unknown>)

  const payload: EmailTemplateApiPayload = {
    emailId: toRequiredMongoId(source.emailId, 'emailId'),
    emailStaticId: toRequiredMongoId(source.emailStaticId, 'emailStaticId'),
    subject: toRequiredString(source.subject, 'subject'),
    discretion: toRequiredString(source.discretion, 'discretion'),
    firstParagraph: toString(source.firstParagraph),
    secondParagraph: toString(source.secondParagraph),
    thirdParagraph: toString(source.thirdParagraph),
    isDeleted: toBoolean(source.isDeleted),
    deletedBy: toNullableString(source.deletedBy),
  }

  if (id) {
    payload.id = id
  }

  return payload
}
