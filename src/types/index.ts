/* ==========================================================================
   TYPES
   --------------------------------------------------------------------------
   This file holds no logic and produces no JavaScript. It is pure
   description: it tells TypeScript what shape our data is allowed to be.

   Everything here disappears when the site is built. Its only job is to
   catch our mistakes while we're writing the code.
   ========================================================================== */

/**
 * One link in the navbar.
 *
 * `interface` gives a name to an object shape. Anything typed as NavLink
 * must have exactly these two properties, and both must be strings.
 */
export interface NavLink {
    /** The visible text, e.g. "About" */
    label: string
    /** The section it scrolls to, e.g. "#about" */
    href: string
}
