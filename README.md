# CubeSquare Property Listing

React + Vite + TypeScript, Bootstrap 5 (Sass) and TanStack Query.

## Run

```bash
npm install && npm run dev
```

Requires Node 18 or newer. Open the URL Vite prints (default http://localhost:5173).

## Demo controls (URL query)

| Param | Values | Effect |
|---|---|---|
| `kyc` | `pending` (default), `rejected`, `approved` | KYC banner (approved renders nothing) |
| `scenario` | `ok` (default), `empty`, `error` | Mock `GET /properties` result |

Example: `/?kyc=rejected&scenario=error`

## Scripts

- `npm run build` strict type-check and production build
- `npm test` Vitest for availability and filter logic
- `npm run lint:styles` Stylelint (no hex colours outside the theme folder)

## Structure

- `src/styles/theme/_tokens.scss` Sass overrides (primary, border radius, font family), the only place design values live
- `src/components/` PropertyCard, KYCStatusBanner, filters panel, skeleton and state message
- `src/pages/PropertyListingPage.tsx` data fetching, filters, loading/empty/error states
- `src/api/properties.ts` mock `GET /properties` (no backend)
- `docs/CSS_GOVERNANCE.md` and `docs/AI_USAGE_REVIEW.md` deliverables
