type MongoOid = { $oid: string }
type MongoNumberLong = { $numberLong: string }
type MongoDate = { $date: string }

export type MongoOidRef = MongoOid

export function normalizeMongoId(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (value && typeof value === 'object') {
    if ('$oid' in value) return String((value as MongoOid).$oid).trim()
    if ('id' in value) return String((value as { id: string }).id).trim()
    if ('_id' in value) return normalizeMongoId((value as { _id: unknown })._id)
  }
  return ''
}

export function toMongoOid(value: unknown, field: string): MongoOidRef {
  const id = normalizeMongoId(value)
  if (!id) throw new Error(`${field} is required`)
  return { $oid: id }
}

export function normalizeMongoNumber(value: unknown, fallback?: number): number | undefined {
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (!Number.isNaN(parsed)) return parsed
  }
  if (value && typeof value === 'object') {
    if ('$numberLong' in value) return normalizeMongoNumber((value as MongoNumberLong).$numberLong)
    if ('$numberInt' in value) return normalizeMongoNumber((value as { $numberInt: string }).$numberInt)
    if ('$numberDouble' in value) {
      return normalizeMongoNumber((value as { $numberDouble: string }).$numberDouble)
    }
  }
  return fallback
}

export function normalizeMongoDate(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (value instanceof Date) return value.toISOString()
  if (value && typeof value === 'object' && '$date' in value) {
    return String((value as MongoDate).$date)
  }
  return undefined
}

export function toBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 1 || value === '1') return true
  if (value === 0 || value === '0') return false
  return value == null ? fallback : Boolean(value)
}

export function toNumber(value: unknown, field: string): number {
  const normalized = normalizeMongoNumber(value)
  if (normalized !== undefined) return normalized
  throw new Error(`${field} must be a valid number`)
}

export function toOptionalNumber(value: unknown, fallback = 0): number {
  if (value === undefined || value === null || value === '') return fallback
  return normalizeMongoNumber(value) ?? toNumber(value, 'expiry_date')
}

export function toRequiredString(value: unknown, field: string): string {
  const normalized = String(value ?? '').trim()
  if (!normalized) throw new Error(`${field} is required`)
  return normalized
}

export function toString(value: unknown, fallback = ''): string {
  return String(value ?? fallback)
}

export function toNullableString(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null
  return String(value).trim()
}

const MONGO_METADATA_KEYS = ['_id', 'createdAt', 'updatedAt', '__v'] as const

export function omitMongoMetadata<T extends Record<string, unknown>>(data: T) {
  const clean = { ...data }
  for (const key of MONGO_METADATA_KEYS) {
    delete clean[key]
  }
  return clean
}
