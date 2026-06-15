import type { EmailEjsFormValues } from '@/lib/schema/emailEjs.schema'
import type { EmailEjsFormInput } from './mapEmailEjsPayload'
import { normalizeMongoId, toBoolean, toString } from './normalizeMongoValue'

export function mapEmailEjsToFormValues(data: EmailEjsFormInput): EmailEjsFormValues {
  return {
    subject: toString(data.subject),
    EJSName: toString(data.EJSName),
    name: toString(data.name),
    emailId: normalizeMongoId(data.emailId),
    isDeleted: toBoolean(data.isDeleted),
  }
}
