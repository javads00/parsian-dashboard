import type { EmailTemplateFormValues } from '@/lib/schema/emailTemplate.schema'
import type { EmailTemplateFormInput } from './mapEmailTemplatePayload'
import { normalizeMongoId, toBoolean, toNullableString, toString } from './normalizeMongoValue'

export function mapEmailTemplateToFormValues(
  data: EmailTemplateFormInput
): EmailTemplateFormValues {
  return {
    subject: toString(data.subject),
    emailId: normalizeMongoId(data.emailId),
    emailStaticId: normalizeMongoId(data.emailStaticId),
    discretion: toString(data.discretion),
    firstParagraph: toString(data.firstParagraph),
    secondParagraph: toString(data.secondParagraph),
    thirdParagraph: toString(data.thirdParagraph),
    isDeleted: toBoolean(data.isDeleted),
    deletedBy: toNullableString(data.deletedBy),
  }
}
