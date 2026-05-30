import type { Dispatch, ReactNode, SetStateAction } from 'react'
export type SetState<T> = Dispatch<SetStateAction<T>>
export type DivProps = React.ComponentProps<'div'>
export type Params = Promise<{ slug: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type ServiceRequest = 'post' | 'get' | 'delete' | 'put'
import type {  FieldValues, UseFormReturn } from 'react-hook-form'
export interface RequestInterface<TBody, TQuery> {
  body?: TBody
  query?: TQuery
  header?: object
  method: ServiceRequest
  url: string
  reuqestType?: 'form-data' | 'blob' | 'json'
  key: any[]
}

export interface ApiErrorResponse {
  success: boolean
  message?: string
  messageList?: {
    message: string
    field: string
  }[]
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface BaseRequest<TBody = unknown, TQuery = unknown> {
  method: HttpMethod
  url: string
  body?: TBody
  header?: Record<string, string>
  query?: TQuery
  reuqestType?: 'json' | 'form-data'
}

export interface UseMutationOptions<TData = unknown, TBody = unknown, TQuery = unknown> {
  request: Omit<BaseRequest<TBody, TQuery>, 'body' | 'query'>
  onSuccess?: (data: TData) => void
  errorHandler?: (error: unknown) => void
  invalidateKeys?: string[]
}

export interface UseMutationResponse<TData> {
  mutate: (body?: unknown, query?: unknown, clearCache?: boolean) => void
  data: TData | undefined
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: unknown
  reset: () => void
}

export interface ModalInterface {
  isOpen: boolean
  title: string
  className?: string
  onAfterClose?: () => void
  onAfterOpen?: () => void
  children?: ReactNode
  onRequestHide?: () => void
}
export interface SaveRequestModalInterface extends Omit<ModalInterface, 'title'> {
  title?: string
}



export type FormUiProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  onCancel: () => void
  isPending: boolean
  submitLabel?: string
  editId?: string
  defaultValues?: Partial<T>
  onSuccess?: () => void


  
}



