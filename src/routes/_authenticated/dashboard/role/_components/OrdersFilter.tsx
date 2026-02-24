import { buildDateCondition } from '../hooks'
import { OrdersFilterUi } from './OrdersFilterUi'
import type { OrdersFilterProps } from './type'

export default function OrdersFilter({ filters, onFilterChange, statusData }: OrdersFilterProps) {
  return (
    <OrdersFilterUi>
      <OrdersFilterUi.RowPerPage
        value={filters.limit}
        onChange={(limit) => onFilterChange({ limit })}
      />

      <OrdersFilterUi.Status
        value={filters.condition.statusId}
        statusData={statusData}
        onChange={(statusId) =>
          onFilterChange({
            condition: { ...filters.condition, statusId },
          })
        }
      />
      <OrdersFilterUi.DatePicker
        from={filters.condition.from}
        to={filters.condition.to}
        onChange={(dateType, from, to) =>
          onFilterChange({
            condition: buildDateCondition(filters.condition, dateType, from, to),
          })
        }
      />
      <OrdersFilterUi.Search
        value={filters.condition.q}
        onChange={(q) =>
          onFilterChange({
            condition: { ...filters.condition, q },
          })
        }
      />
    </OrdersFilterUi>
  )
}
