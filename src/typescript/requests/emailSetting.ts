export type SmtpAuthType = 'OAuth2' | 'SMTP'

export type MongoOidRef = {
  $oid: string
}

export type SmtpApiPayload = {
  host: string
  type: SmtpAuthType
  OAUTH_Client_Secret: string
  OAUTH_Client_ID: string
  email: string
  password: string
  port: number
  isServerEmail: boolean
  isDeleted: boolean
  refresh_Token: string
  access_Token: string
  expiry_date: number
}

export type EmailTemplateApiPayload = {
  id?: string
  emailId: string
  emailStaticId: string
  subject: string
  discretion: string
  firstParagraph: string
  secondParagraph: string
  thirdParagraph: string
  isDeleted: boolean
  deletedBy: string | null
}

export type EmailEjsApiPayload = {
  id?: string
  emailId: string
  subject: string
  EJSName: string
  name: string
  isDeleted: boolean
}

export type TEmailEjs = {
  id: string
  emailId: string | MongoOidRef | TEmailTemplatePopulatedSmtp
  subject: string
  EJSName: string
  name: string
  isDeleted: boolean
  createdAt?: Date | string | { $date: string }
  updatedAt?: Date | string | { $date: string }
}

export type TEmailStatic = {
  id: string
  templateAddress: string
  showtempAddress: string
  showPicAddress: string | null
  name: string
  picAddress: string | null
  isDeleted: boolean
  deletedBy: string | null
  createdAt?: Date | string | { $date: string }
  updatedAt?: Date | string | { $date: string }
}

export type TSmtp = SmtpApiPayload & {
  id: string
  createdAt?: Date | string | { $date: string }
}

export type TEmailTemplatePopulatedSmtp = TSmtp & {
  _id?: string
}

export type TEmailTemplate = {
  id: string
  emailId: string | MongoOidRef | TEmailTemplatePopulatedSmtp
  emailStaticId: string | MongoOidRef
  subject: string
  discretion: string
  firstParagraph: string
  secondParagraph: string
  thirdParagraph: string
  isDeleted: boolean
  deletedBy: string | null
  createdAt?: Date | string | { $date: string }
  updatedAt?: Date | string | { $date: string }
}
