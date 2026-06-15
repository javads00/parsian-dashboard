import { useAuthStore } from '@/features'
import { loginFormSchema, signInMutationOptions, type LoginFormProps } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import LoginFormUi from './LoginFormUi'

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
    ...signInMutationOptions(),
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
