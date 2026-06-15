import { parseEnvelope } from '@/lib'
import type { KyInstance } from 'ky'
import { ApiHttpError } from './api-error'
import type { ApiEnvelope, ApiResponse, RequestOptions } from './type'

function resolveTotalPages(envelope: ApiEnvelope<unknown>): number | undefined {
  if (envelope.pages != null) {
    const pages = Number(envelope.pages)
    if (!Number.isNaN(pages) && pages > 0) return pages
  }

  const metaTotalPages = envelope.metaData?.totalPages
  if (metaTotalPages != null) {
    const pages = Number(metaTotalPages)
    if (!Number.isNaN(pages) && pages > 0) return pages
  }

  return undefined
}

function toApiResponse<T>(envelope: ApiEnvelope<T>, response: Response): ApiResponse<T> {
  return {
    data: envelope.data,
    message: envelope.message,
    pages: resolveTotalPages(envelope),
    metaData: envelope.metaData,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  }
}

export async function fetchData<T>(
  apiClient: KyInstance,
  url: string | URL,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const response = await apiClient.get(url, {
    headers: options?.headers,
    signal: options?.signal,
    throwHttpErrors: false,
  })

  const json = await parseEnvelope<T>(response)

  if (!response.ok) {
    throw new ApiHttpError(json.message ?? 'Request failed', response.status, response.statusText)
  }

  return toApiResponse(json, response)
}

export async function request<T, B = unknown>(
  apiClient: KyInstance,
  method: 'post' | 'put' | 'patch',
  url: string | URL,
  body: B,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const response = await apiClient[method](url, {
    json: body,
    headers: options?.headers,
    signal: options?.signal,
    throwHttpErrors: false,
  })

  const json = await parseEnvelope<T>(response)

  if (!response.ok) {
    throw new ApiHttpError(json.message ?? 'Request failed', response.status, response.statusText)
  }

  return toApiResponse(json, response)
}

export async function deleteByUrl<T>(
  apiClient: KyInstance,
  url: string | URL,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const response = await apiClient.delete(url, {
    headers: options?.headers,
    signal: options?.signal,
    throwHttpErrors: false,
  })

  const json = await parseEnvelope<T>(response)

  if (!response.ok) {
    throw new ApiHttpError(json.message ?? 'Request failed', response.status, response.statusText)
  }

  return toApiResponse(json, response)
}

export async function deleteRequest<T, B = unknown>(
  apiClient: KyInstance,
  url: string | URL,
  body: B,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const response = await apiClient.delete(url, {
    json: body,
    headers: options?.headers,
    signal: options?.signal,
    throwHttpErrors: false,
  })

  const json = await parseEnvelope<T>(response)

  if (!response.ok) {
    throw new ApiHttpError(json.message ?? 'Request failed', response.status, response.statusText)
  }

  return toApiResponse(json, response)
}
