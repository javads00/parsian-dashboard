export type TStatusOrder = {
  id: string
  name: string
  label: string
  description: string
  isPad?: boolean
  isApprovedPad?: boolean
  createdAt: Date
}

export type TStatusOrderForm = {
  name: string
  label: string
  description: string
  id?: string
}

export type TCountry = {
  id: string
  name: string
  createdAt: Date
}

export type TGlobalPayload = {
  id: string
}




