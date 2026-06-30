import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Select({
    className,
    ...props
}: ComponentProps<'select'>) {
    return (
        <select
            className={clsx(
                'border-mineral-300 bg-bone-50 text-obsidian-900 focus:border-vital-500 focus:ring-vital-100 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed appearance-none',
                className,
            )}
            {...props}
        >
            {props.children}
        </select>
    )
}
