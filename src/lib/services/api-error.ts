export class ApiHttpError extends Error {
  readonly status: number
  readonly statusText: string

  constructor(message: string, status: number, statusText: string) {
    super(message)
    this.name = 'ApiHttpError'
    this.status = status
    this.statusText = statusText
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export function isApiHttpError(error: unknown): error is ApiHttpError {
  return error instanceof ApiHttpError
}
