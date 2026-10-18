import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps } from 'react'

const sizes = {
  md: 'px-5 py-2',
  lg: 'px-6 py-3',
}

const variants = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600',
  secondary: 'bg-white text-green-950 hover:bg-orange-500 hover:text-white',
  soft: 'bg-green-800/10 text-green-950 hover:bg-orange-500 hover:text-white',
}

type Size = keyof typeof sizes
type Variant = keyof typeof variants

export function buttonStyles(variant: Variant = 'primary', size: Size = 'md') {
  return clsx(
    'inline-flex min-h-11 max-w-full shrink-0 items-center justify-center gap-2 rounded-full text-center text-sm leading-6 font-medium no-underline transition-colors duration-200 [&>svg]:shrink-0',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-60',
    'aria-pressed:bg-orange-500 aria-pressed:text-white aria-selected:bg-orange-500 aria-selected:text-white aria-[current=page]:bg-orange-500 aria-[current=page]:text-white',
    sizes[size],
    variants[variant],
  )
}

type ButtonProps = { size?: Size; variant?: Variant } & ComponentProps<'button'>
type ButtonLinkProps = { size?: Size; variant?: Variant; href: string } & Omit<ComponentProps<'a'>, 'href'>

export function Button({ size = 'md', variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return <button type={type} className={clsx(buttonStyles(variant, size), className)} {...props} />
}

export function ButtonLink({ size = 'md', variant = 'primary', href, className, ...props }: ButtonLinkProps) {
  return <Link href={href} className={clsx(buttonStyles(variant, size), className)} {...props} />
}

export function SoftButton(props: ButtonProps) {
  return <Button variant="soft" {...props} />
}

export function SoftButtonLink(props: ButtonLinkProps) {
  return <ButtonLink variant="soft" {...props} />
}

export function PlainButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />
}

export function PlainButtonLink(props: ButtonLinkProps) {
  return <ButtonLink variant="secondary" {...props} />
}
