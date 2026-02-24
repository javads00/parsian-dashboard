import { Card } from '@/components'
import { getAuthStore, LoginForm } from '@/features'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  beforeLoad: async () => {
    const { user } = getAuthStore()?.getState() ?? {}
    if (user) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-end gap-14 bg-gray-100 px-2 pt-12 duration-200 sm:px-6 md:gap-24 dark:bg-black">
      <Header />
      <Card className="rounded-t-200 shadow-soft relative flex min-h-[650px] w-full flex-col items-center gap-16 bg-gray-50 px-5 py-8 shadow-[#6780B214] xl:max-w-7xl dark:border dark:border-gray-400 dark:bg-gray-900">
        <BackgroundImages />
        <div className="flex w-full max-w-[480px] flex-1 flex-col gap-6 md:gap-12">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <LoginForm />
        </div>
      </Card>
    </main>
  )
}

const Header = () => {
  return (
    <h3 className="relative z-10 text-[clamp(1rem,5vw,3rem)] font-extralight">
      <div className="bg-linear-to-r from-[#1B6BED] to-[#1DB4FF] bg-clip-text text-transparent">
        The best <strong className="font-bold">CRM Coaching</strong>
        and
      </div>
      <div className="bg-linear-to-l from-[#1B6BED] to-[#1DB4FF] bg-clip-text text-transparent">
        <strong className="font-bold">Management </strong> system ever
        <strong className="font-bold">.</strong>
      </div>
    </h3>
  )
}

const BackgroundImages = () => {
  return (
    <>
      <img
        src="images/auth/ellipse.png"
        alt="Illustration"
        draggable={false}
        width={285}
        height={285}
        className="absolute end-6 bottom-full select-none lg:end-[clamp(2rem,6vw,8rem)]"
      />
      <img
        src="images/auth/ellipse-full.png"
        alt="Illustration"
        draggable={false}
        width={85}
        height={85}
        className="absolute start-[clamp(1rem,5vw,10rem)] bottom-[calc(100%+10rem)] z-20 select-none lg:start-[clamp(2rem,16vw,15.5rem)] lg:bottom-[calc(100%+11rem)]"
      />
    </>
  )
}
