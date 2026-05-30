import type { KyInstance } from 'ky'
import type { ApiResponse } from './type'

export async function fetchData<T>(
  apiClient: KyInstance,
  url: string | URL,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  const response = await apiClient.get(url, {
    headers: {
      ...headers,
    },
    throwHttpErrors: false,
  })

  const json = await response.json<{
    data: T
    message?: string
    pages?: number
    metaData?: ApiResponse<T>['metaData']
  }>()

  if (!response.ok) {
    throw {
      message: json.message ?? 'Request failed',
      status: response.status,
      statusText: response.statusText,
    }
  }

  return {
    data: json.data,
    message: json.message,
    pages: json.pages,
    metaData: json.metaData,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  }
}

export async function request<T, B = unknown>(
  apiClient: KyInstance,
  method: 'post' | 'put' | 'patch' | 'delete',
  url: string | URL,
  body: B,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  const response = await apiClient[method](url, {
    json: body,
    headers: {
      ...headers,
    },
    throwHttpErrors: false,
  })

  console.log(response, 'response[method]')

  const json = await response.json<{ data: T; message?: string; pages?: number }>()

  if (!response.ok) {
    throw {
      message: json.message ?? 'Request failed',
      status: response.status,
      statusText: response.statusText,
    }
  }

  return {
    data: json.data,
    message: json.message,
    pages: json.pages,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  }
}
