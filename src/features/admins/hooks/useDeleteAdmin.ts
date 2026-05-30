import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import type { ApiResponse } from '@/lib/services/type'

const deleteAdmin = async (id: string) => {
  const response = await apiClient.delete(endpoints.admins.delete(id), {
    throwHttpErrors: false,
  })

  const json = await response.json<{ data: unknown; message?: string }>()

  if (!response.ok) {
    return {
      data: null,
      message: json.message,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      ok: response.ok,
    } as ApiResponse<unknown>
  }

  return {
    data: json.data,
    message: json.message,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok,
  } as ApiResponse<unknown>
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: () => {
      // Invalidate admins list to refetch after deletion
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
  })
}
