import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { navLinks } from '../data/navigation'
import './Navbar.css'

function Navbar() {
    /* ------------------------------------------------------------------
       STATE -- the three things this navbar has to remember.

       useState hands back a pair: the current value, and a function that
       changes it. Calling the setter re-runs this whole function and
       React updates the page.

       Notice there are no type annotations here. TypeScript sees the
       starting value `false` and works out that `scrolled` is a boolean
       on its own. That's inference -- you only annotate when TS can't
       figure it out itself.
       ------------------------------------------------------------------ */
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('#hero')

    /* ------------------------------------------------------------------
       EFFECT 1 -- watch how far the page has scrolled.

       The scroll event belongs to the browser, not to React, so we need
       useEffect to reach outside. The returned function is the cleanup:
       React runs it when this component is removed, which detaches the
       listener. Skip that and you leak a listener every time.

       The empty [] at the end means "run this once, on mount".
       ------------------------------------------------------------------ */
    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // run once immediately, in case we load part-scrolled

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* ------------------------------------------------------------------
       EFFECT 2 -- freeze the page behind the mobile menu.

       [menuOpen] means "re-run this whenever menuOpen changes", so the
       lock goes on when the menu opens and comes off when it closes.
       ------------------------------------------------------------------ */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    /* ------------------------------------------------------------------
   EFFECT 3 -- scroll-spy. Figures out which section is currently in
   view and updates activeLink to match, so the nav highlights the
   right link even when the user scrolls manually instead of clicking.
   ------------------------------------------------------------------ */
useEffect(() => {
    const sectionIds = ['hero', ...navLinks.map((link) => link.href.replace('#', ''))]

    // Some sections might not exist yet (Skills/Contact/etc. before
    // they're built) -- document.getElementById returns null for those.
    // This filter both removes the nulls AND tells TypeScript the
    // result is now HTMLElement[], not (HTMLElement | null)[].
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(`#${entry.target.id}`)
                }
            })
        },
        // Shrinks the "visible" zone the observer checks against down to a
        // thin horizontal line through the middle of the screen (50% off
        // the top, 50% off the bottom leaves 0% in the middle). A section
        // is only reported as "intersecting" once it crosses that line --
        // without this, whichever section merely OVERLAPS the viewport at
        // all counts, so two sections can appear "active" simultaneously
        // during a fast scroll.
        { rootMargin: '-50% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
}, [])

    /* `href: string` is the one annotation TypeScript genuinely needs.
       It can't guess what a parameter will be handed, so we tell it.
       Now calling selectLink(5) is an error, not a mystery bug. */
    function selectLink(href: string) {
        setActiveLink(href)
        setMenuOpen(false)
    }

    return (
        <>
            <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
                <a
                    href="#hero"
                    className="logo"
                    onClick={() => selectLink('#hero')}
                >
                    <span className="bracket">&lt;</span>
                    Vickey
                    <span className="bracket">/&gt;</span>
                </a>

                {/* Desktop links. `.map()` turns each object in the array into
                    an <li>. The `key` lets React tell the items apart when the
                    list changes -- it warns in the console without one. */}
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={activeLink === link.href ? 'active' : ''}
                                onClick={() => selectLink(link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="nav-cta">
                    <a
                        href="#contact"
                        className="hire-btn"
                        onClick={() => selectLink('#contact')}
                    >
                        Hire Me
                    </a>

                    <button
                        className="hamburger"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <HiMenu />
                    </button>
                </div>
            </nav>

            {/* Dimmed backdrop -- tapping it closes the menu */}
            <div
                className={menuOpen ? 'menu-overlay open' : 'menu-overlay'}
                onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in mobile panel. It's always in the DOM; CSS slides it
                off-screen when closed, which is what makes the animation
                possible. */}
            <aside className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
                <button
                    className="close-btn"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <HiX />
                </button>

                {/* Second argument of .map() is the index, which gives us the
                    01 / 02 / 03 numbering for free -- no extra data needed. */}
                <ul className="mobile-links">
                    {navLinks.map((link, index) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={activeLink === link.href ? 'active' : ''}
                                onClick={() => selectLink(link.href)}
                            >
                                <span className="num">0{index + 1}</span>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="#contact"
                    className="mobile-hire-btn"
                    onClick={() => selectLink('#contact')}
                >
                    Hire Me
                </a>
            </aside>
        </>
    )
}

export default Navbar
