import { useAuthStore } from '@/features'
import { loginFormSchema, type LoginFormProps } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/services/api'
import { endpoints } from '@/lib/services/endpoints'
import { request } from '@/lib/services/requst'
import type { AuthorizedUser } from '@/typescript'
import LoginFormUi from './LoginFormUi'

const signIn = async (data: LoginFormProps) => {
  return request<AuthorizedUser, { username: string; password: string }>(
    apiClient,
    'post',
    endpoints.auth.login(),
    {
      username: data.username,
      password: data.password,
    }
  )
}

export function LoginForm() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const form = useForm<LoginFormProps>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { mutate: signInMutation, isPending: isSigningIn } = useMutation({
    mutationFn: (body: LoginFormProps) => signIn(body),
    onSuccess: (res) => {
      if (res.data) {
        useAuthStore.setState({ user: res.data, authorized: true })
      }
      navigate({ to: '/dashboard' })
    },
  })

  return (
    <LoginFormUi
      form={form}
      onSubmit={(data) => signInMutation(data)}
      isPending={isSigningIn}
      user={user}
    />
  )
}
