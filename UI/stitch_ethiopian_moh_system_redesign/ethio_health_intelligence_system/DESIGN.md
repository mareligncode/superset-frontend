---
name: Ethio-Health Intelligence System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414751'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727783'
  outline-variant: '#c1c6d3'
  surface-tint: '#095fae'
  primary: '#004482'
  on-primary: '#ffffff'
  primary-container: '#005cab'
  on-primary-container: '#bdd6ff'
  inverse-primary: '#a6c8ff'
  secondary: '#006a60'
  on-secondary: '#ffffff'
  secondary-container: '#8ef4e4'
  on-secondary-container: '#007166'
  tertiary: '#005011'
  on-tertiary: '#ffffff'
  tertiary-container: '#186a21'
  on-tertiary-container: '#95e88f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a6c8ff'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#004786'
  secondary-fixed: '#8ef4e4'
  secondary-fixed-dim: '#72d8c8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
  max_width: 1440px
---

## Brand & Style

The visual identity of this design system is built on the pillars of **institutional trust, clinical precision, and accessibility**. It is designed for a diverse user base ranging from high-level government officials to frontline healthcare workers in Ethiopia.

The aesthetic follows a **Corporate/Modern** direction, blending the systematic rigor of Material Design 3 with the refined depth of Microsoft Fluent. The UI focuses on clarity and information density, ensuring that complex epidemiological data and healthcare metrics are digestible. The emotional response is one of security and reliability—critical for a national health platform handling sensitive data.

Key style characteristics:
- **Clarity over decoration:** Every element serves a functional purpose in data visualization or navigation.
- **Governmental Authority:** High-contrast layouts and a structured grid communicate stability.
- **Inclusivity:** High legibility standards to support users across various devices and lighting conditions.

## Colors

The palette is anchored by a **Deep Healthcare Blue**, derived from official Ministry branding, symbolizing security and officialdom. This is complemented by **Teal and Medical Greens**, which evoke health, vitality, and growth.

- **Primary Blue (#005CAB):** Used for primary actions, branding, and active navigational states.
- **Secondary Teal (#00877A):** Used for supporting interactive elements and data categories.
- **Medical Green (#2E7D32):** Reserved for clinical indicators and positive trends.
- **Functional Neutrals:** A slate-grey scale is used for typography and borders to maintain a cool, professional temperature.
- **Backgrounds:** A crisp white surface is paired with a very light grey (#F8FAFC) background to create clear separation between the canvas and data cards.

## Typography

The system utilizes **Inter** for all applications. Inter’s tall x-height and open counters make it exceptionally legible for the dense numerical data and complex terminology found in medical reporting.

**Hierarchy Rules:**
- **Headlines:** Use Semi-Bold (600) weights to establish clear section entry points.
- **Data Points:** Numbers in charts and dashboards should use Medium (500) weights to stand out from descriptive body text.
- **Labels:** Small caps or increased letter spacing should be used for secondary metadata and table headers to provide a distinct visual texture compared to interactive text.
- **Mobile:** Font sizes scale down conservatively; headlines are reduced for small screens, while body text remains at 16px to ensure readability in the field.

## Layout & Spacing

The system employs a **12-column fluid grid** for desktop, transitioning to a 4-column layout for mobile devices. 

- **Density:** This is a high-density system. Use a 4px base unit to allow for precise alignment of complex dashboard components.
- **Margins & Gutters:** 24px gutters provide enough "breathing room" to prevent cognitive overload, while 32px page margins ground the content.
- **Reflow:** On tablets, the sidebar collapses into a hamburger menu to prioritize the data canvas. Cards should stack vertically on mobile while maintaining their internal padding.
- **Alignment:** All form inputs and labels must align to the baseline of the grid to maintain the "government-standard" precision.

## Elevation & Depth

Visual hierarchy is managed through **tonal layering and soft ambient shadows**.

- **Level 0 (Background):** #F8FAFC. The lowest layer.
- **Level 1 (Cards/Surface):** #FFFFFF. Used for the primary content areas. Features a very subtle shadow (0px 2px 4px rgba(0,0,0,0.05)) and a light 1px border (#E2E8F0) to define edges against the background.
- **Level 2 (Hover/Active):** A slightly deeper shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) used when a card is interactive or picked up.
- **Level 3 (Modals/Overlays):** Significant depth with a 20% opacity backdrop blur to focus the user's attention on critical tasks.

Outlines are preferred over heavy shadows for form fields and buttons to maintain a "flat and clean" professional appearance.

## Shapes

The shape language is **Soft-Geometric**. 

- **Corner Radius:** A standard 8px radius (`rounded`) is used for cards, buttons, and input fields. This strikes a balance between the friendliness of rounded UI and the serious, structural nature of a government platform.
- **Icons:** Use "rounded" or "outline" icon sets (e.g., Material Symbols) to match the UI's radius.
- **Buttons:** Primary buttons use the 8px radius; however, secondary "chips" or tags may use 16px (rounded-lg) for clear distinction from actionable buttons.

## Components

### Buttons & Actions
- **Primary:** Solid #005CAB with white text. 8px radius. High contrast.
- **Secondary:** Outlined with Primary Blue. Used for less critical actions like "Export" or "Filter."
- **Ghost:** Minimal padding, used for "Cancel" or "Close" actions within modals.

### Inputs & Filters
- **Outlined Style:** Fields use a 1px #CBD5E1 border, turning Primary Blue on focus.
- **Floating Labels:** Preferred for space efficiency in data-heavy views.
- **Filters:** Grouped in a left-hand sidebar or a collapsible top "drawer" with clear "Active" indicators (blue dots).

### Cards
- **Structure:** 24px internal padding. Title at top-left, "more" options (three dots) at top-right.
- **Separation:** Use a light grey divider (#F1F5F9) between card headers and content.

### Data Visualization
- **Palette:** Use a custom 6-color categorical palette (Blue, Teal, Green, Amber, Orange, Purple) optimized for color-blind accessibility.
- **Tooltips:** Dark grey background with white Inter-Label-MD text for maximum contrast against light charts.

### Lists & Tables
- **Row Height:** 48px for standard, 40px for compact views.
- **Zebra Striping:** Use #F8FAFC on even rows to aid horizontal tracking of data.