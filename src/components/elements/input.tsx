import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Input({
    className,
    type = 'text',
    ...props
}: ComponentProps<'input'>) {
    return (
        <input
            type={type}
            className={clsx(
                'border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                className,
            )}
            {...props}
        />
    )
}
