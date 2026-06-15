import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components'
import { EnvSwitcher } from '@/components/EnvSwitcher'
import { LoginForm } from '@/features'
import { LayoutDashboard, Lock, Shield } from 'lucide-react'

export function LoginPage() {
  return (
    <main className="bg-layout-bg relative flex h-dvh items-center justify-center overflow-hidden px-4">
      <LoginBackground />

      <div className="relative z-10 w-full max-w-[400px]">
        <Card className="border-layout-border gap-0 overflow-visible border py-0 shadow-lg">
          <CardHeader className="space-y-4 px-6 pt-7 pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm">
                  <LayoutDashboard className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-semibold">Management System</p>
                  <p className="text-muted-foreground text-xs">Admin dashboard</p>
                </div>
              </div>

              <EnvSwitcher requireConfirmation={false} variant="login" className="shrink-0" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">Welcome back</CardTitle>
              <CardDescription>Sign in to access your workspace</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-5 pb-6">
            <LoginForm />
          </CardContent>

          <CardFooter className="border-layout-border bg-layout-surface/60 flex items-center justify-between border-t px-6 py-3">
            <div className="flex items-center gap-4">
              <TrustBadge icon={Shield} label="Encrypted" />
              <TrustBadge icon={Lock} label="Secure" />
            </div>
            <span className="text-muted-foreground text-[11px]">Terms & Privacy</span>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: typeof Shield
  label: string
}) {
  return (
    <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
      <span>{label}</span>
    </div>
  )
}

function LoginBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--layout-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--layout-border) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />
      <div
        aria-hidden
        className="bg-sidebar-accent/8 pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-layout-surface/80 pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full blur-2xl"
      />
      <div
        aria-hidden
        className="border-layout-border/60 pointer-events-none absolute top-[18%] left-[12%] h-28 w-28 rounded-full border"
      />
      <div
        aria-hidden
        className="border-layout-border/40 pointer-events-none absolute right-[10%] bottom-[22%] h-20 w-20 rounded-full border"
      />
    </>
  )
}
