# Portfolio Build Spec

Reference template: https://sohaibnadeem-portfolio.netlify.app/
Owner: Ajayi Victor ("Vickey Jay") — Full Stack Developer
Stack: Vite + React 19 + TypeScript, plain external CSS (one file per component),
framer-motion, react-icons.

---

## Section order

0. Preloader
1. Navbar
2. Section indicator rail (vertical, numbered, scroll-spy)
3. Marquee ticker
4. Hero
5. About — "01 — About Me"
6. Skills — "02 — Skills"
7. Projects — "03 — Projects"
8. Services — "04 — Services"
9. Contact — "05 — Contact"
10. Footer

---

## 0. Preloader
- Greeting line: "Welcome To <name> Portfolio"
- Status text "Initializing..." with progress percentage
- Dismisses when loaded

## 1. Navbar
- Logo as a code tag: `<Portfolio/>` style, monospace, links to `#hero`
- Links: About, Skills, Projects, Services, Contact
- Theme switcher: sun / moon (light + dark both fully supported)
- CTA button: "Hire Me" -> `#contact`
- Sticky; frosted glass on scroll; mobile hamburger

## 2. Section indicator rail
- Fixed vertical rail: `01 / About`, `02 / Skills`, `03 / Projects`,
  `04 / Services`, `05 / Contact`
- Highlights the section currently in view (scroll-spy)

## 3. Marquee ticker
- Infinite horizontal loop, items separated by the glyph U+2726
- Items are role + tech + status + location

## 4. Hero
- Availability pill: "Available for freelance work"
- Small kicker "I'm" above the H1 name
- Typewriter / rotating role text with blinking cursor
- Bio paragraph with certain terms bolded
- Two buttons: "Explore Work" -> `#projects`, "Email Me" -> mailto
- Three count-up stat counters (animate from 0 on scroll)
- Cut-out portrait PNG (background removed)
- Rotating circular badge around the portrait
- Floating info chips near the portrait
- Orbiting tech tags
- Scroll cue at the bottom
- Particle-network background (animated dots + connecting lines)

## 5. About
Two columns.
- LEFT: image inside a card with a role label; below it a spec-sheet of
  label/value pairs (name, location, etc.)
- RIGHT: two-line heading, three paragraphs, an italicised motto,
  four trait chips, three link buttons (GitHub / LinkedIn / Email)

## 6. Skills — heading "My Tech Arsenal"
Tabbed interface, three panels:
- **Technical** — animated percentage bars
- **Tools** — icon cards with a one-line description each
- **Soft Skills** — icon cards with a one-line description each

## 7. Projects — heading "Things I've Built"
- Filter buttons: All / Web / App / UI-Design
- Cards numbered 01, 02, 03...
- Each card: image, hover overlay link, tech tags, title, blurb, repo link
- One card may be featured/wide
- Closing CTA: "See All Projects on GitHub"

## 8. Services — heading "What I Can Do For You"
- Four numbered cards (01-04)
- Each: large icon, title, description, three-item bullet list, arrow affordance

## 9. Contact — heading "Let's Build Together"
- Contact tiles: email, whatsapp, location, github
- Status pill: "Currently open to freelance projects"
- Form: Name*, Email*, Subject*, Message* + "Send Message" button

## 10. Footer
- Monogram (e.g. "VA.")
- Tagline
- Four icon-only social links
- Copyright line

---

## Motion checklist
preloader -> theme toggle -> smooth-scroll anchors -> numbered scroll-spy rail ->
looping marquee -> hero typewriter -> rotating badge -> count-up stats ->
animated skill bars -> tabbed panels -> filterable project grid -> card hover
overlays -> contact form

---

## Confirmed content

Name: Ajayi Victor (Vickey Jay)
Title: Full Stack Developer
Tagline: I build modern web applications with React.js.
Bio: Passionate Full Stack Developer. Started 3 years ago. Specialises in the
     MERN stack, strong with React.js. Builds fast, responsive, user-friendly
     applications.
Tech: React.js, Node.js, Tailwind CSS, JavaScript, Git, Vercel

GitHub:   https://github.com/Vickeyjay
LinkedIn: https://www.linkedin.com/in/victor-ajayi-a85a73402
X:        https://x.com/vickeycodes
WhatsApp: https://wa.me/2349020274394
Old site: https://victor-ajayi.vercel.app/

### Projects
1. Hotel Website     — https://github.com/Vickeyjay/Hotel_Website
2. EdgeLedger        — https://github.com/Vickeyjay/EdgeLedger_Website
3. Keke Cruise       — https://github.com/Vickeyjay/Keke_Cruise
                       live: https://keke-cruise-tsmy.vercel.app/
4. Sprinton          — https://github.com/Vickeyjay/SprintenOfficialApp
5. Tokora Marketplace — deferred, "Coming Soon" placeholder

---

## Palette — dark mode (locked)

Blue accent, purple gradient, teal reserved for status.
No CSS variables: these hex values are typed directly into each rule.

    BACKGROUNDS
      #080B14   page background
      #0D1220   section bands
      #111726   cards
      #182034   card hover
      #21293D   borders

    TEXT
      #FFFFFF   headings
      #AFB8CC   body
      #79839A   muted / captions

    INTERACTIVE  (buttons, links, active nav, focus rings)
      #3B82F6   blue
      #60A5FA   blue hover

    BRAND GRADIENT  (hero name, 01/02/03 labels, glows -- never on a button)
      linear-gradient(135deg, #8B5CF6, #3B82F6)

    FUNCTIONAL  (Live Demo / Available badges only -- keep rare)
      #00C2C7   teal

Rule of thumb: one accent for anything clickable, gradient for decoration
only, teal only when it carries meaning.

---

## STILL NEEDED from Victor

- [ ] Profile photo, background removed (PNG) for the hero
- [ ] CV / resume PDF for the Download CV button
- [ ] Email address for the mailto links
- [ ] City / location for the About spec-sheet and floating chips
- [ ] The three hero stat counters — template used
      "Projects / Semester / Passion". Victor's equivalents?
      Suggested: Projects, Years Experience (3), Passion %
- [ ] Short blurb (1-2 sentences) for each project
- [ ] Live demo URLs for Hotel Website, EdgeLedger, Sprinton
- [ ] Project screenshots (or we use placeholder imagery)
- [ ] Skill percentages for the Technical tab
- [ ] Personal motto for the About section
- [ ] Freelance availability — true or false?
