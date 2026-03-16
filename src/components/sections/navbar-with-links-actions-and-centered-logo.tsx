'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ElDialog, ElDialogPanel } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { FacebookIcon } from '@/components/icons/social/facebook-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { WhatsAppIcon } from '@/components/icons/social/whatsapp-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import {
    SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'

export function NavbarLink({
    children,
    href,
    className,
    ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={clsx(
                'group inline-flex items-center justify-between pl-2 gap-2 text-base no-underline uppercase transition-colors duration-300',
                isActive
                    ? 'text-orange-600 font-black pointer-events-none'
                    : 'md:hover:text-orange-600 font-medium',
                className,
            )}
            {...props}
        >
            <span className="font-sans max-lg:hidden text-[1.25rem]">{children}</span>
            <span className="font-display font-light text-[2.25rem] normal-case hidden max-lg:inline-flex">{children}</span>
        </Link>
    )
}

export function NavbarLogo({ className, href, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            {...props}
            className={clsx(
                'inline-flex items-stretch transition-colors duration-300',
                isActive ? 'text-orange-600' : 'text-green-950 hover:text-orange-600',
                className,
            )}
        />
    )
}

export function NavbarWithLinksActionsAndCenteredLogo({
    links,
    logo,
    actions,
    className,
    ...props
}: {
    links: ReactNode
    logo: ReactNode
    actions: ReactNode
} & ComponentProps<'header'>) {
    const pathname = usePathname()
    const isHomeActive = pathname === '/'

    return (
        <header className={clsx('sticky top-0 z-50 w-full', className)} {...props}>
            <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
            <nav className='px-4'>
                <div className="mx-auto flex h-(--scroll-padding-top) text-green-800 bg-neutral-200 rounded-lg items-center gap-4 px-6 lg:px-10">
                    <div className="flex ">{logo}</div>
                    <div className="flex flex-1 items-center justify-end gap-4">
                        <div className="flex shrink-0 items-center gap-5">
                            <div className="flex flex-1 gap-8 max-lg:hidden">{links}</div>
                            {actions}
                        </div>
                        <button
                            command="show-modal"
                            commandfor="mobile-menu"
                            aria-label="Toggle menu"
                            className="inline-flex rounded-full p-1.5 text-green-950 hover:bg-green-900/10 lg:hidden"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path
                                    fillRule="evenodd"
                                    d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <ElDialog className="lg:hidden">
                    <dialog id="mobile-menu" className="backdrop:bg-transparent">
                        <ElDialogPanel className="fixed inset-0 bg-green-100 px-6 py-6 lg:px-10">
                            <div className="flex h-full flex-col">
                                <div className="flex justify-between">
                                    <Link
                                        href="/"
                                        className={clsx(
                                            'inline-flex items-center transition-colors duration-300 decoration-none',
                                            isHomeActive ? 'text-orange-600' : 'text-green-950 hover:text-orange-600',
                                        )}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 122 100" width="122" height="100" fill="currentColor" className="w-48 h-auto">
                                            <path d="M3.8,95.08v-.32c.74-.22.98-.79.98-2.81v-10.98c0-2.02-.25-2.58-.98-2.81v-.32h5.76c3.79,0,5.34,1.26,5.34,3.25,0,1.67-1.08,3.2-3.89,3.72,4.01.2,5.79,2.19,5.81,4.6.05,2.76-2.02,5.66-8,5.66H3.8ZM12.66,81.54c0-2.04-1.45-3.32-3.99-3.32h-1.87v6.55h2.29c2.44,0,3.57-1.43,3.57-3.22ZM14.58,90.03c0-2.83-1.58-4.9-5.27-4.9h-2.51v7.43c0,1.77.22,2.14,1.28,2.14h.96c4.01,0,5.54-1.94,5.54-4.68Z M18.33,79.91v-.28c1.22,0,1.73-.98,1.73-1.84h.28c0,.85.57,1.84,1.71,1.84v.28c-1.14,0-1.71.91-1.71,1.78h-.28c0-.88-.52-1.78-1.73-1.78ZM18.4,94.76c.76-.22.98-.79.98-2.81v-5.66c0-1.72-.3-1.97-.98-2.26v-.27l2.71-1.18.2.17v9.21c0,2.02.25,2.58.98,2.81v.32h-3.89v-.32Z M24.04,89.1c0-3.84,3.08-6.5,6.45-6.5,3.05,0,6.43,1.87,6.43,6.25s-3.52,6.47-6.43,6.47c-3.13,0-6.45-1.94-6.45-6.23ZM35.04,90.31c0-3.18-2.24-7.41-5.46-7.24-2.51.1-3.64,2.17-3.64,4.63,0,3.13,2.02,7.11,5.29,7.11,2.63,0,3.82-2.12,3.82-4.5Z M39.08,93.58l-.12-3.42.27-.05c.96,2.58,2.83,4.78,6.25,4.78,1.97,0,3.67-1.28,3.67-3.27,0-2.46-3.03-3.59-5.1-4.43-2.9-1.16-4.75-2.19-4.75-4.8,0-2.88,2.39-4.7,6.01-4.7,2.24,0,3.84.62,4.8,1.13l.1,2.86-.25.07c-.91-2.14-2.63-3.67-5.44-3.67-1.99,0-3.69,1.16-3.69,3.25,0,2.31,2.54,3.25,4.63,4.11,2.73,1.08,5.29,2.17,5.29,4.95,0,3.08-2.86,4.95-5.76,4.95-2.58,0-4.75-.91-5.91-1.75Z M50.6,99.14c0-.47.62-1.35,1.53-1.35.64,0,1.97.37,3.1.57.86-.74,1.62-1.94,2.24-3.22l-4.04-9.48c-.76-1.85-1.38-2.34-1.9-2.56v-.32h3.72v.32c-.74.22-.54.71.25,2.56l3.03,7.04,3.03-7.04c.69-1.6.64-2.39-.22-2.56v-.32h2.73v.32c-.69.22-1.33.71-2.14,2.56l-3.82,8.81c-2.09,4.83-4.26,5.34-5.83,5.37-.96.02-1.67-.3-1.67-.69Z M65.03,94.17l-.22-2.98.22-.05c1.03,2.34,2.78,3.74,5.02,3.77,1.53,0,2.66-.91,2.66-2.29,0-1.77-1.72-2.34-3.62-2.95-2.34-.74-4.01-1.38-4.01-3.62,0-1.94,1.62-3.45,4.48-3.45,1.6,0,3.05.34,3.82.66l.1,2.51-.25.05c-.79-1.77-2.36-2.9-4.11-2.9s-2.76.81-2.76,2.07c0,1.55,1.58,2.19,3.52,2.83,1.87.62,4.14,1.18,4.14,3.64,0,2.07-1.55,3.82-4.5,3.84-1.97,0-3.67-.59-4.48-1.13Z M77.07,91.81v-8.69h-1.58v-.34l3.15-3.03h.34v3.03h3.74l-.12.34h-3.62v8.69c0,1.67.69,2.31,1.75,2.31.69,0,1.55-.32,2.36-1.28l.22.22c-1.06,1.21-2.31,2.26-3.77,2.26-1.55,0-2.49-.96-2.49-3.52Z M83.84,89.3c0-4.01,3.03-6.7,6.47-6.7,3.1,0,4.9,2.02,4.97,4.36h-9.63c-.05.37-.07.74-.07,1.13,0,3.37,2.09,5.69,5.29,5.69,1.9,0,3.25-.86,4.38-2.14l.22.22c-1.26,1.72-3.18,3.47-5.81,3.47s-5.83-1.97-5.83-6.03ZM93.31,86.64c-.25-1.65-1.58-3.59-3.82-3.59-2.09-.02-3.37,1.53-3.77,3.59h7.58Z M96.96,94.76c.76-.22.98-.79.98-2.81v-5.66c0-1.72-.32-1.97-.98-2.26v-.27l2.68-1.18.22.17v2.09c1.48-1.18,3.32-2.24,5.1-2.24s2.98.74,3.42,2.31c1.48-1.18,3.37-2.31,5.22-2.31,2.39,0,3.62,1.3,3.62,4.09v5.27c0,2.02.25,2.58.98,2.81v.32h-3.89v-.32c.76-.22.98-.79.98-2.81v-4.83c0-2.44-.89-3.72-2.81-3.72-1.4,0-2.68.76-4.04,1.82.1.42.15.91.15,1.45v5.27c0,2.02.22,2.58.98,2.81v.32h-3.89v-.32c.74-.22.98-.79.98-2.81v-4.83c0-2.44-.91-3.72-2.81-3.72-1.4,0-2.68.76-4.01,1.77v6.77c0,2.02.25,2.58.98,2.81v.32h-3.89v-.32Z M121.84,57.64c-.25-6.87-5.9-13.65-16.99-13.65,3.93-14.69.15-19.08.15-19.08-3.11-5.36-8.37-1.83-11.48,1.45-2.95,3.11-4.95,6.92-7.37,10.41.92-2.95,2.32-6.3,2.32-9.98,0-4.01-3.04-7.64-7.49-2.78-3.45,3.77-5.21,6.67-7.47,11.51.34-1.36.66-2.82.93-4.37,1.19-6.97,1.21-23.82-10.64-17.3-7.77,4.27-11.84,15.6-14.32,20.95-8.01,15.77-12.02,15.76-12.02,15.76-1.78,0,.03-5.96.56-7.53,2.37-6.98,5.94-13.5,8.67-20.32-2.3,1.77-5.47,1.24-5.47,1.24-2.13,5.18-4.18,9.53-7.09,14.32-2.33,3.84-5.9,9-9.85,11.25-7.15,4.08-5.91-5.98-5.14-9.92.51-2.58,1.41-5.31,2.3-7.79,0,0,.39-1.16,1.04-2.84,8.3-2.05,16.82-8.23,20.29-16.03,2.16-4.85,3.23-13.25-4.95-10.97-4.38,1.22-8.97,5.9-11.73,9.38-4.08,5.14-6.89,11.24-8.77,17.51-9.48,0-14.45-5.27-15.3-11.16C.27,5.64,12.63-2.11,23.48,1.59c2.63.9,2.71,1.12,3.6,1.62C16.86-3.97-.33,2.09.16,15.71c.25,6.87,5.9,13.65,16.99,13.65-3.93,14.69-.15,19.08-.15,19.08,3.11,5.36,8.37,1.83,11.48-1.45,2.95-3.11,4.95-6.92,7.37-10.41-.92,2.95-2.32,6.3-2.32,9.98,0,4.01,3.04,7.64,7.49,2.78,3.54-3.86,5.29-6.81,7.64-11.87-1,3.74-1.37,6.36-1.37,6.36-.6,5.4-.95,18.53,7.78,17.03,6.92-1.19,12.13-10.16,14.9-15.93,0,0,.43-.96,3.06-7.05,7.7-14.91,11.51-15.07,11.51-15.07,1.78,0-.03,5.96-.56,7.53-2.37,6.98-5.94,13.5-8.67,20.32,2.3-1.77,5.47-1.24,5.47-1.24,2.13-5.18,4.18-9.53,7.09-14.32,2.33-3.84,5.9-9,9.85-11.25,7.15-4.08,5.91,5.98,5.14,9.92-.51,2.58-1.41,5.31-2.3,7.79,0,0-.39,1.16-1.04,2.84-8.3,2.05-16.82,8.23-20.29,16.03-2.16,4.85-3.23,13.25,4.95,10.97,4.38-1.22,8.97-5.9,11.73-9.38,4.08-5.14,6.89-11.24,8.77-17.51,9.48,0,14.45,5.27,15.3,11.16,1.73,12.05-10.63,19.8-21.48,16.1-2.63-.9-2.71-1.12-3.6-1.62,10.22,7.19,27.41,1.13,26.91-12.49ZM31.2,11.52c1.67-2.63,5.68-8.43,8.91-8.94,5.35-.84,3.26,7.21,2.08,9.9-3.18,7.2-10.86,13.56-19.52,15.94.73-1.88,1.73-4.27,2.85-6.43,2.67-5.19,3.63-7.24,5.69-10.47ZM70.89,28.64c-1.95,7.82-5.74,17.87-9.87,24.78-1.4,2.34-4.08,6.74-7.05,6.88-5.45.24-4.39-7.99-3.81-11.41,1.55-9.12,7.65-25.65,13.48-32.84.92-1.14,2.05-2.53,3.57-2.83,7.55-1.53,4.63,11.68,3.69,15.43ZM90.8,61.83c-1.67,2.63-5.68,8.43-8.91,8.94-5.35.84-3.26-7.21-2.08-9.9,3.18-7.2,10.86-13.56,19.52-15.94-.73,1.88-1.73,4.27-2.85,6.43-2.67,5.19-3.63,7.24-5.69,10.47Z" />
                                        </svg>
                                    </Link>
                                    <button
                                        command="close"
                                        commandfor="mobile-menu"
                                        aria-label="Toggle menu"
                                        className="inline-flex rounded-full p-1.5 text-green-950 hover:bg-green-900/10"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flex flex-col gap-6">{links}</div>

                                <div className="mt-auto border-t border-green-900/10 pt-6">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-green-900/70">Contacto</p>
                                    <div className="mt-3 flex flex-col gap-2 text-sm text-green-900/90">
                                        <a href="mailto:contacto@eonbiosystem.com" className="inline-flex items-center gap-2 hover:text-orange-600">
                                            <MailIcon className="size-4" />
                                            contacto@eonbiosystem.com
                                        </a>
                                        <a href="https://wa.me/5215545848965" className="inline-flex items-center gap-2 hover:text-orange-600">
                                            <WhatsAppIcon className="size-4" />
                                            +52 55 4584 8965
                                        </a>
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-green-900/70">Visítanos</p>
                                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-green-950/90">
                                        <SocialLink href="https://www.facebook.com/eonbiosystem" name="Facebook" target='_blank'>
                                            <FacebookIcon />
                                        </SocialLink>
                                        <a href="https://maps.app.goo.gl/7HCJZv8jL7gShTRs9" target="_blank" title='Ver Ubicación en GoogleMaps' className="inline-flex items-center gap-2 hover:text-orange-600">
                                            <MapPinIcon className="size-6" />
                                        </a>
                                        <SocialLink href="https://www.instagram.com/eonbiosystem" name="Instagram" target='_blank'>
                                            <InstagramIcon />
                                        </SocialLink>
                                        <SocialLink href="https://x.com/eonbiosystem" name="X" target='_blank'>
                                            <XIcon />
                                        </SocialLink>
                                    </div>
                                </div>
                            </div>
                        </ElDialogPanel>
                    </dialog>
                </ElDialog>
            </nav>
        </header>
    )
}
