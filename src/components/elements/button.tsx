import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps } from 'react'

type Size = 'md' | 'lg'
type Variant = 'primary' | 'secondary' | 'soft'

export function buttonStyles(variant: Variant = 'primary', size: Size = 'md') {
  return `action-button action-button--${variant} action-button--${size}`
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
