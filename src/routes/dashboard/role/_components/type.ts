export type RoleStatus = {
  description: string
  id: string
  label: string
  name: string
}

// Order List Request Types
export type RoleListCondition = {
  type?: string
  from?: string
  to?: string
  fromPaid?: string
  toPaid?: string
  fromETA?: string
  toETA?: string
  fromDelivered?: string
  toDelivered?: string
  fromExpired?: string
  toExpired?: string
  fromFinalized?: string
  toFinalized?: string
  fromCancelled?: string
  toCancelled?: string
  statusId?: string
  sellerId?: string
  driverId?: string
  stateId?: string
  containerId?: string
  depotId?: string
  q?: string
  fulfilled?: number
  color?: string
  containerSize?: string
  containerType?: string
  taxExempt?: number
}

export type RoleListRequest = {
  page: number
  limit: number
  condition: RoleListCondition
}

export type RoleFilterProps = {
  filters: RoleListRequest
  onFilterChange: (partial: Partial<RoleListRequest>) => void
  statusData: RoleStatus[]
}
