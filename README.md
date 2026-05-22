# WELLS Precast Connection Calculator

A React + TypeScript + Vite web app that serves as a structural-engineering calculation toolkit for
WELLS precast concrete connection design. Replaces MathCAD worksheets with interactive,
browser-based calc sheets rendered with KaTeX, and produces print-quality PDF via the browser's
native print dialog.

## Worksheets

| Reference | Title | Status |
|-----------|-------|--------|
| 5.3.2.2.ZP5 | Flat Wall Panel to Flat Wall Panel Face Connection | ✓ |

The ZP5 worksheet computes X (out-of-plane shear), Y (vertical bearing), and Z (in-plane shear)
capacities for a connection assembly of three components — weld, field plate, and precast embed —
and reports the controlling capacity for each direction.

### Verification (default inputs)

| Result | Computed | Expected |
|--------|----------|----------|
| X_w | 1.711 | 1.711 kip |
| Y_w | 14.375 | 14.375 kip |
| Z_w | 33.075 | 33.075 kip |
| X_pl | 4.556 | 4.556 kip |
| Y_pl | 29.160 | 29.16 kip |
| Z_pl | 48.600 | 48.6 kip |
| X_pc | 3.216 | 3.216 kip |
| Y_pc | 7.555 | 7.555 kip |
| Z_pc | 21.600 | 21.6 kip |
| **X** | **1.711** | **1.711 kip** |
| **Y** | **7.555** | **7.555 kip** |
| **Z** | **21.600** | **21.6 kip** |

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the built bundle
```

## Architecture

```
src/
  shell/                 App + Sidebar
  components/            Shared UI: WorksheetLayout, TitleBlock, CalcLine,
                         CalcSection, CalcNote, InputField, SummaryTable,
                         PrintButton, Katex
  utils/                 katex-helpers, solver (bisection), materials, format
  worksheets/
    index.ts             Worksheet registry — add one entry per worksheet
    zp5-flat-wall-face/  inputs / calc / types / Sheet / view
```

Adding a worksheet:

1. Create `src/worksheets/<id>/` with `inputs.ts`, `calc.ts`, `types.ts`, `Sheet.tsx`, `index.tsx`.
2. Register it in `src/worksheets/index.ts`. The sidebar rebuilds automatically.

## Deployment

The app is configured for GitHub Pages with `base: '/calc_pad_poc/'` in `vite.config.ts`. Push to
`main` triggers `.github/workflows/deploy.yml`, which builds and deploys.

If you fork into a different repo name, update both `base` and the workflow.

## Printing

Click **Print / PDF** in the input panel — or use ⌘P / Ctrl+P. The `@media print` stylesheet
hides the sidebar/inputs, removes UI chrome, and renders the calc sheet at US Letter with ~0.75"
margins.
