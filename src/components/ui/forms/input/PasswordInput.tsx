import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from './Input'
import { cn } from '@/lib/utils'

export interface PasswordInputProps extends React.ComponentProps<'input'> {
    className?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        return (
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('pr-10', className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-0 top-0 flex h-full items-center justify-center px-3 py-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
