import type { AuthorizedUser } from '@/typescript'
import type { LoginFormProps } from '@/lib'
import { mutationOptions } from '@tanstack/react-query'
import { apiClient } from '../api'
import { endpoints } from '../endpoints'
import { keys } from '../keys'
import { request } from '../request'

export const signInMutationOptions = () =>
  mutationOptions({
    mutationKey: keys.auth.signIn(),
    mutationFn: (input: LoginFormProps) =>
      request<AuthorizedUser, { username: string; password: string }>(
        apiClient,
        'post',
        endpoints.auth.login(),
        {
          username: input.username,
          password: input.password,
        }
      ),
    meta: { toast: true },
  })
