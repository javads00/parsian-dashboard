import { buildDateCondition } from '../hooks/-index'
import { RoleFilterUi } from './RoleFilterUi'
import type { RoleFilterProps } from './type'

export default function RoleFilter({ filters, onFilterChange, statusData }: RoleFilterProps) {
  return (
    <RoleFilterUi>
      <RoleFilterUi.RowPerPage
        value={filters.limit}
        onChange={(limit) => onFilterChange({ limit })}
      />

      <RoleFilterUi.Status
        value={filters.condition.statusId}
        statusData={statusData}
        onChange={(statusId) =>
          onFilterChange({
            condition: { ...filters.condition, statusId },
          })
        }
      />
      <RoleFilterUi.DatePicker
        from={filters.condition.from}
        to={filters.condition.to}
        onChange={(dateType, from, to) =>
          onFilterChange({
            condition: buildDateCondition(filters.condition, dateType, from, to),
          })
        }
      />
      <RoleFilterUi.Search
        value={filters.condition.q}
        onChange={(q) =>
          onFilterChange({
            condition: { ...filters.condition, q },
          })
        }
      />
    </RoleFilterUi>
  )
}
