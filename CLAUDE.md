# HandsOnPixel Developer Guide & Conventions

This guide documents the design system, codebase structure, commands, and rules for the HandsOnPixel digital agency web application.

---

## 🛠 Commands & Scripts

- **Development Server**: `npm run dev`
- **Production Build**: `npm run build`
- **Linting**: `npm run lint`
- **Preview Production Build**: `npm run preview`

---

## 🎨 Visual Identity & Design System

### Colors (Tailwind Tokens)
- **Primary Background**: `#0A0A0A` (class: `bg-background` / `bg-background-DEFAULT`)
- **Secondary Background**: `#141414` (class: `bg-background-secondary` / cards, overlays, section panels)
- **Main Text**: `#F5F5F5` (class: `text-text` / `text-text-DEFAULT`)
- **Muted/Body Text**: `#8A8A8A` (class: `text-muted` / sub-headings, paragraphs)
- **Accent/Teal**: `#3fb7bc` (class: `text-accent` / buttons, borders, highlights)
- **Accent Hover**: `#359fa3` (class: `hover:bg-accent-hover` / button hover state)

### Typography
- **Primary Font**: `Poppins` (sans-serif)
- **Decorative Font**: `Russo One` (RussoOne-Regular.ttf), used for small, bold accents (e.g., `BlueDot` like `<span className="text-accent font-['Russo_One'] ml-1">.</span>`)
- **Headings** (`h1` - `h6`): Uppercase, font weight 900 (`font-black`), `letter-spacing: 0.05em`.
- **Global Body Styles**: `antialiased selection:bg-accent/30 line-height: 1.6 letter-spacing: 0.025em`.

---

## 💠 Component & Layout Patterns

### Glassmorphism & Cards
- **Standard Glass Container**: 
  - Background: `bg-white/[0.03]` or `rgba(15, 15, 20, 0.98)`
  - Backdrop Blur: `backdrop-blur-[24px]` (disable on mobile screens `< 768px` for performance)
  - Border: `border border-white/10` or `border border-white/[0.12]`
  - Corner Radius: `rounded-[2.5rem]` (40px) or `rounded-3xl` for smaller boxes.
  - Drop Shadow: `shadow-2xl` or deep dark shadows `shadow-[0_8px_32px_rgba(0,0,0,0.4)]`
- **Inside Card Accent**: `radial-gradient(circle at 100% 0%, rgba(63,183,188,0.15) 0%, transparent 60%)` for a premium glow.

### Animations & Transitions (Framer Motion)
- **Standard Ease Curve**: `[0.16, 1, 0.3, 1]` (cubic-bezier)
- **Scrolling Stack/Transitions**: Use conditional responsive logic.
  - **Desktop**: Scroll-based card transformations (rotation, scaling down, translating offset).
  - **Mobile**: "Liquid Glass Stacking" using entry/exit opacity fades, scaling, and blur filters.
- **Micro-interactions**: 
  - Icons scale up (`group-hover:scale-110`) and glow (`shadow-[0_8px_32px_rgba(63,183,188,0.15)]`).
  - Project cards use grayscale-to-color transition (`grayscale group-hover:grayscale-0`) and subtle image zooms (`scale-105 group-hover:scale-110`).
  - Button hover uses box-shadow glow (e.g., `shadow-[0_0_24px_rgba(63,183,188,0.25)] hover:shadow-[0_0_40px_rgba(63,183,188,0.5)]`).

### Global Elements
- **Lenis Smooth Scroll**: Hooked up on Desktop, disabled on Mobile (`width < 768px`).
- **Animated Background**: Dynamic floating radial glows with Framer Motion in `AnimatedBackground.jsx`.
- **Film Grain Overlay**: Fixed position screen blend mode on Desktop (`opacity: 0.05`), hidden on Mobile.

---

## 💻 Directory Structure

- `/src`
  - `/assets` - Local fonts (`Poppins`, `Russo One`), Hop Logo, project thumbnails.
  - `/components` - Modular UI blocks (`Navbar`, `Footer`, `SEO`, `Analytics`, `HeroSection`, `AnimatedBackground`, etc.).
  - `/layouts` - Routing shell (`MainLayout.jsx` with Lenis & grain overlays).
  - `/pages` - Top-level pages (`Home`, `Despre`, `Servicii`, `Portofoliu`, `Blog`, `Contact`, `AITest`).
    - `/portofoliu` - Individual sub-pages/case-studies for portfolio items.
    - `/blog` - Individual articles/sub-pages.
  - `App.jsx` - App entry point with React Router routing structure.
  - `index.css` - Custom @font-face rules, Tailwind imports, scroll reveals.

---

## 🎯 Development Guidelines & Best Practices

1. **Romanian Language (RO)**: All user-facing text, page titles, descriptions, and CTAs must be in Romanian.
2. **SEO first**: Each page must include the `<SEO>` component with a descriptive `title` (optional, falls back to brand default) and `description` props. Use the `schema` prop for custom JSON-LD.
3. **Responsive Performance**: Disable resource-intensive features (heavy backdrop blurs, Lenis smooth scrolling, film grain, background animations) on mobile viewports (`window.innerWidth < 768`).
4. **Tailwind Class Ordering**: Write Tailwind utility classes grouped by layout, spacing, colors, typography, borders, and lastly states/interactive modifiers (`hover:`, `md:`, `group-hover:`).
