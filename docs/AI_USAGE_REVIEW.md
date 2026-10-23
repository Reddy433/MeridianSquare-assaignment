# AI Usage Review

**Tool:** Claude Code (Claude Sonnet 5.5) in VS Code.

**Key prompts:**

1. "Build a React + Vite + TypeScript + Bootstrap 5 (Sass) + TanStack Query app with a typed PropertyCard, a PropertyListingPage with filters and explicit loading, empty and error states, and a KYCStatusBanner, using the supplied mock data and the task's theme rules."
2. "Override primary colour, border radius and font family through Sass variables only. Use Bootstrap contextual classes for the KYC banner. No hex values or custom component CSS."
3. "Add Stylelint rules that fail on hex colours outside the theme folder, and write a short CSS governance note covering PR enforcement and white-label theming."

**What the AI got right:**

- The component split: a presentational PropertyCard, a pure `filterProperties` function, and a thin page that owns filter state and the three data states.
- Deriving the low-availability flag from data (`available / total < 0.2`) through one tested helper instead of hardcoding it per property.
- Bootstrap contextual classes for the KYC banner and a single token file imported before Bootstrap.

**What I corrected and why:**

- **Rounding bug.** Downtown Loft has 498 of 500 tokens, and the first version showed "100% remaining" because of rounding. I changed the label to floor the value and show "<1%" for tiny non-zero amounts, so it never overstates availability.
- **Sass deprecations.** Bootstrap 5.3 still uses `@import`, which produces deprecation noise with current Sass. I silenced only the known deprecations in the Vite config instead of rewriting to `@use`, which would not configure Bootstrap's variables correctly.
- **Loading state.** A bare spinner is explicitly disallowed, so I used Bootstrap placeholder skeletons with an accessible status message, and made the error state offer a retry.
- **Empty states.** I separated "no properties exist" from "no properties match the filters", and gave the second a Reset action.

**Verification:** `npm run build` (strict `tsc` plus Vite) passes, 6 Vitest tests pass for the availability and filter logic, and Stylelint passes. I checked the desktop render in a headless browser. I did not test the mobile layout visually or run an accessibility audit.
