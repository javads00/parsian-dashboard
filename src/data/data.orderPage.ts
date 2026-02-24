export const ORDER_PAGE_FILTER_ROW_PER_PAGE_OPTIONS = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '50',
    value: 50,
  },

  {
    label: '100',
    value: 100,
  },

  {
    label: '250',
    value: 250,
  },
  {
    label: '500',
    value: 500,
  },
]

export const ORDER_PAGE_FILTER_DATE_OPTIONS = [
  {
    label: 'Created Date',
    value: 'Created',
  },
  {
    label: 'Paid Date',
    value: 'Paid',
  },
  {
    label: 'ETA',
    value: 'ETA',
  },
  {
    label: 'Delivery Date',
    value: 'Deliverd',
  },
  {
    label: 'Expired Date',
    value: 'Expired',
  },
  {
    label: 'Canceled Date',
    value: 'Canceled',
  },
  {
    label: 'Finalized Date',
    value: 'Finalized',
  },
]

export const ORDER_PAGE_FILTER_DROPDOWN_OPTIONS = [
  {
    label: 'Order number',
    value: 'order',
  },
  {
    label: 'Customer info',
    value: 'customer',
  },
  {
    label: 'Release number',
    value: 'inventory',
  },
]

export const DATE_FIELD_MAP = {
  Created: { from: 'from', to: 'to' },
  Paid: { from: 'fromPaid', to: 'toPaid' },
  ETA: { from: 'fromETA', to: 'toETA' },
  Deliverd: { from: 'fromDelivered', to: 'toDelivered' },
  Expired: { from: 'fromExpired', to: 'toExpired' },
  Canceled: { from: 'fromCancelled', to: 'toCancelled' },
  Finalized: { from: 'fromFinalized', to: 'toFinalized' },
} as const
