import type { NavLink } from '../types'

/**
 * The navbar links, in order.
 *
 * `: NavLink[]` means "an array of NavLink objects". That one annotation is
 * what makes this file safe to edit: misspell a property, forget one, or use
 * a number where a string belongs, and your editor underlines it here --
 * rather than you finding out from a blank page in the browser.
 *
 * There's no "Home" entry because the logo handles that, same as the template.
 */
export const navLinks: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
]
