import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Label({
    className,
    required,
    ...props
}: {
    required?: boolean
} & ComponentProps<'label'>) {
    return (
        <label
            className={clsx('text-obsidian-900 block text-sm font-semibold', className)}
            {...props}
        >
            {props.children}
            {required && <span className="text-vital-600 ml-1">*</span>}
        </label>
    )
}
