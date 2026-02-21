'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

export function FooterCategory({ title, children, ...props }: { title: ReactNode } & ComponentProps<'div'>) {
 return (
  <div {...props}>
   <h3>{title}</h3>
   <ul role="list" className="mt-2 flex flex-col gap-2">
    {children}
   </ul>
  </div>
 )
}

export function FooterLink({ href, className, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
 const pathname = usePathname()
 const isActive = pathname === href

 return (
  <li className={clsx('transition-colors', isActive ? 'text-orange-600 font-semibold' : 'text-green-700 hover:text-orange-600', className)}>
   <Link href={href} {...props} />
  </li>
 )
}

export function SocialLink({
 href,
 name,
 className,
 ...props
}: {
 href: string
 name: string
} & Omit<ComponentProps<'a'>, 'href'>) {
 return (
  <Link
   href={href}
   target="_blank"
   aria-label={name}
   className={clsx('text-green-950 *:size-6', className)}
   {...props}
  />
 )
}

export function NewsletterForm({
 headline,
 subheadline,
 className,
 ...props
}: {
 headline: ReactNode
 subheadline: ReactNode
} & ComponentProps<'form'>) {
 return (
  <form className={clsx('flex max-w-sm flex-col gap-2', className)} {...props}>
   <p>{headline}</p>
   <div className="flex flex-col gap-4 text-green-700">{subheadline}</div>
   <div className="flex items-center border-b border-green-950/20 py-2 has-[input:focus]:border-green-950">
    <input
     type="email"
     placeholder="Email"
     aria-label="Email"
     className="flex-1 text-green-950 focus:outline-hidden"
    />
    <button
     type="submit"
     aria-label="Subscribe"
     className="relative inline-flex size-7 items-center justify-center rounded-full after:absolute after:-inset-2 hover:bg-green-900/10 after:pointer-fine:hidden"
    >
     <ArrowNarrowRightIcon />
    </button>
   </div>
  </form>
 )
}

export function FooterWithNewsletterFormCategoriesAndSocialIcons({
 cta,
 links,
 fineprint,
 socialLinks,
 className,
 ...props
}: {
 cta: ReactNode
 links: ReactNode
 fineprint: ReactNode
 socialLinks?: ReactNode
} & ComponentProps<'footer'>) {
 return (
  <footer className={clsx('', className)} {...props}>
   <div className="bg-green-800/2.5 py-16 text-green-950">
    <Container className="flex flex-col gap-16">
     <div className="grid grid-cols-1 gap-x-6 gap-y-16 text-sm/7 lg:grid-cols-2">
      {cta}
      <nav className="grid grid-cols-2 gap-6 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 lg:max-xl:has-[>:last-child:nth-child(4)]:grid-cols-2">
       {links}
      </nav>
     </div>
     <div className="flex items-center justify-between gap-10 text-sm/7">
      <div className="text-green-600">{fineprint}</div>
      {socialLinks && <div className="flex items-center gap-4 sm:gap-10">{socialLinks}</div>}
     </div>
    </Container>
   </div>
  </footer>
 )
}
