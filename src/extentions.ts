declare global {
  interface Date {
    toMiladi(): string
    toMiladiWithTime(): string
  }
}

Date.prototype.toMiladi = function (): string {
  if (!this) return ""
  const date = new Date(this).toISOString().split('T')[0]
  return date
}

Date.prototype.toMiladiWithTime = function (): string {
  if (!this) return ""
  const date = this as Date
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}`
}
