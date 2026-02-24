import { DATE_FIELD_MAP } from '@/data'
import { endpoints, useCustomPaginationQuery, useCustomQuery } from '@/lib'
import type { Admin } from '@/typescript'
import { useState } from 'react'
import type { OrderListCondition, OrderListRequest } from '../_components/type'



export const useGetAdminsData = () => {
  const { data, isPending, page, setPage } = useCustomPaginationQuery<Admin[]>({
    url: (page: number) => endpoints.admins.list(page, 10),
    key: ['admins', 'list'],
  })

  return {
    data,
    isPending,
    page,
    setPage,
  }
}

export const useGetOrderStatusData = () => {
  const { data, isPending } = useCustomQuery<Admin[]>({
    url: endpoints.admins.list(1, 10),
    key: ['admins', 'list', '1', '10'],
  })

  return {
    data,
    isPending,
  }
}

export function useOrderFilters(initial?: Partial<OrderListRequest>) {
  const [filters, setFilters] = useState<OrderListRequest>({
    condition: {
      fulfilled: 0,
      taxExempt: 0,
      type: 'order',
    },
    limit: 10,
    page: 1,
    ...initial,
  })

  const setPartialFilters = (partial: Partial<OrderListRequest>) => {
    setFilters((prev) => ({
      ...prev,
      ...partial,
      page: 1,
    }))
  }

  return {
    filters,
    setFilters,
    setPartialFilters,
  }
}

export function buildDateCondition(
  prevCondition: OrderListCondition,
  dateType: keyof typeof DATE_FIELD_MAP,
  from?: string,
  to?: string
) {
  const cleaned = Object.keys(DATE_FIELD_MAP).reduce(
    (acc, key) => {
      const { from, to } = DATE_FIELD_MAP[key as keyof typeof DATE_FIELD_MAP]
      acc[from] = undefined
      acc[to] = undefined
      return acc
    },
    {} as Record<string, undefined>
  )

  const map = DATE_FIELD_MAP[dateType]

  return {
    ...prevCondition,
    ...cleaned,
    [map.from]: from,
    [map.to]: to,
  }
}
