import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Checkbox({
    className,
    ...props
}: ComponentProps<'input'>) {
    return (
        <input
            type="checkbox"
            className={clsx(
                'text-vital-600 focus:ring-vital-100 h-4 w-4 rounded border-mineral-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
                className,
            )}
            {...props}
        />
    )
}
