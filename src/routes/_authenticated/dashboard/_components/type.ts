import type { MENU_ITEMS } from '@/data'
import type { useLocation } from '@tanstack/react-router'

export type SideBarComponentProps = {
  isSigningOut: boolean
  handleSignOut: () => void
  location: ReturnType<typeof useLocation>
}

export type SideBarUiProps = {
  currentItem: (typeof MENU_ITEMS)[number]
}

// Order Types
export type GeoLocation = {
  type: 'Point'
  coordinates: [number, number]
}

export type StateId = {
  id: string
  name?: string
  shortName?: string
  taxId?: string
  isActive?: boolean
  _id?: string
  isDeleted?: boolean
  deletedBy?: string | null
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export type Address = {
  id?: string
  _id?: string
  location: GeoLocation
  city: string
  zipcode: string
  stateId: StateId
  addressDetail: string
  isDeleted: boolean
  deletedBy: string | null
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export type Container = {
  id: string
  name: string
  size: string
  externalLength: string
  externalWidth: string
  externalHeight: string
  interiorLength: string
  interiorWidth: string
  interiorHeight: string
  tare: string
  maxPayload: string
  description: string
  pic: string
  isDeleted: boolean
  deletedBy: string | null
  condition: string
  sizeCategory: string
  typeCategory: string
}

export type Location = {
  id: string
  name: string
  color: string
  addressId: string
  containerIds: string[]
  disablePAD: boolean
}

export type ContainerPricing = {
  id: string
  containerId: Container
  locationId: Location
  price: number
  pricePickup: number
  fluctuation: number
  fluctuationPickup: number
  date: string
  isDeleted: boolean
  deletedBy: string | null
  isActive: boolean
  createdAt: string
}

export type OrderItem = {
  id: string
  containerPricingId: ContainerPricing
  destination_Address_Id: Address
  finalPrice: number
  QTY: number
  deliveryIsFree: boolean
  estimated_Delivery_Cost: number
  isDelivery: boolean
  unitPrice: number
  estimated_Delivery_Cost_isPair: number
  estimated_Delivery_Cost_isNotPair: number
  estimated_Delivery_Cost_isPair_perUnit: number
  estimated_Delivery_Cost_isNotPair_perUnit: number
  estimated_Delivery_Cost_perUnit: number
  createdAt: string
  updatedAt: string
}

export type Customer = {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  addressId: Address
  isDeleted: boolean
  deletedBy: string | null
}

export type ParentId = {
  id: string
  _id: string
  bankAccountType: string
  UCUserId: string | null
  hideCommission: boolean
  appliedAgent: string | null
}

export type RoleId = {
  id: string
}

export type CountryId = {
  _id: string
  name: string
  isDeleted: boolean
  deletedBy: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

export type User = {
  id: string
  _id: string
  fullName: string
  email: string
  picture?: string
  isOnline: boolean
  parentId?: ParentId
  roleID?: RoleId
  createdAt?: string
  faceBookName?: string
  faceBookEmail?: string
  faceBookId?: string
  selfManagement?: boolean
  agentBlocked?: boolean
  isSigned?: boolean
  userContractIds?: (string | null)[]
  isDeleted?: boolean
  step?: number
  profilePicture?: string
  bankAccountType?: string
  hasPage?: boolean
  showContract?: boolean
  contractStatus?: number
  hideRanking?: boolean
  userContractLinks?: string[]
  commissionContractStatus?: number
  UCUserId?: string | null
  hideCommission?: boolean
  lastLoginAt?: string
  lastQuoteAt?: string
  lastInvoiceAt?: string
  isAssistant?: boolean
  agentBlockedAt?: string | null
  agentBlockedBy?: string | null
  fcmToken?: string
  appliedAgent?: string | null
  countryId?: CountryId
}

export type Status = {
  _id: string
  name: string
  description: string
  sort: number
  isDeleted: boolean
  deletedBy: string | null
  createdAt: string
  updatedAt: string
  __v: number
  label: string
  isPad: boolean
  isApprovedPad: boolean
}

export type Label = {
  _id: string
  name: string
  isDeleted: boolean
  deletedBy: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

export type Logistic = {
  id: string
  _id: string
  mileage: number
  potentialDeliveryCost: number
  approvedQuote: string
  orderId: string
  isDeleted: boolean
  deletedBy: string | null
}

export type Order = {
  id: string
  orderItems: OrderItem[]
  customerId: Customer
  sellerId: User
  managerId: User
  addressId: Address
  statusId: Status
  labelId: Label
  inventoryOrderIds: string[]
  totalAmount: number
  customDiscount: number
  customAmount: number
  totalTax: number
  taxAmount: number
  totalCost: number
  totalPaid: number
  description: string | null
  orderNum: number
  discountSeasonalTime: string | null
  totalQuantity: number
  discountsApplied: unknown[]
  subTotal: number
  discountAmount: number
  estimated_Delivery_Cost: number
  createdAt: string
  logistic: Logistic
  referenceCode: string
  isPayable: boolean
  assistantId: string | null
  hasSpecial: boolean
  cxView: number
  userView: number
  isInformed: boolean
  fluctuation: number
  notes: string
  isShort: boolean
  isSubmittedPadForm: boolean
  isSubmittedOcForm: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  pages: number
}
