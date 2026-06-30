import type { ReactNode } from 'react'
import { clsx } from 'clsx/lite'
import { Label } from './label'

export function FormGroup({
    children,
    className,
    label,
    htmlFor,
    required,
    description,
    error,
}: {
    children: ReactNode
    className?: string
    label?: string
    htmlFor?: string
    required?: boolean
    description?: ReactNode
    error?: string
}) {
    return (
        <div className={clsx('flex flex-col gap-2', className)}>
            {label && (
                <Label htmlFor={htmlFor} required={required}>
                    {label}
                </Label>
            )}
            {children}
            {description && !error && (
                <p className="text-mineral-600 text-sm">{description}</p>
            )}
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </div>
    )
}
