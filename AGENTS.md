# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# Design System & Theme

All visual styling must use the tokens from `src/constants/theme.ts`. Do NOT hardcode colors, spacing, or typography values.

## Color Palette (`ElitePalette`)

**Surfaces:** `#fcf8fa` (surface), `#f6f3f5` (low), `#f0edef` (container), `#eae7e9` (high), `#e4e2e4` (highest), `#ffffff` (lowest)
**Text:** `#1b1b1d` (onSurface), `#45464d` (onSurfaceVariant)
**Primary:** `#000000` (on `#ffffff`)
**Secondary:** `#0058be` (on `#ffffff`)
**Error:** `#ba1a1a`
**Misc:** `#76777d` (outline), `#c6c6cd` (outlineVariant), `#a6a0a5` (tabInactive)

## Light/Dark Mode (`Colors.light` / `Colors.dark`)

Use `Colors.light` and `Colors.dark` for theme-aware values. Key aliases:
- `text`, `background`, `backgroundElement`, `backgroundSelected`
- `textSecondary`, `primary`, `onPrimary`, `secondary`, `onSecondary`
- `error`, `surface`, `surfaceLowest/Low/High/Highest`, `border`, `outline`
- `overlay`, `overlayStrong`, `shadow`, `tabInactive`

Dark overrides: background `#151517`, text `#f3f0f2`, primary `#f3f0f2`, secondary `#8bb8ff`, surface `#1b1b1d`

## Spacing (`Spacing`)

Base unit: 4px. Named tokens: `half:2`, `one:4`, `two:8`, `three:12`, `four:16`, `five:20`, `six:24`, `seven:32`, `eight:40`, `nine:48`, `ten:64`
Layout: `containerPadding:20`, `stackGapSm:8`, `stackGapMd:16`, `stackGapLg:32`, `sectionMargin:48`

## Border Radius (`Radius`)

`sm:4`, `md:8`, `lg:12`, `xl:16`, `pill:24`, `full:999`

## Typography (`Typography`)

- `displayLg`: 40/48, weight 700, letter-spacing -1.6
- `headlineLg`: 32/40, weight 600, letter-spacing -0.64
- `titleMd`: 20/28, weight 600
- `priceLg`: 24/32, weight 500, letter-spacing -0.24
- `bodyMd`: 16/24, weight 400
- `bodySm`: 14/20, weight 400
- `labelCaps`: 12/16, weight 700, letter-spacing 0.96, uppercase

## Fonts (`Fonts`)

Platform-specific: iOS uses `system-ui`/`ui-serif`/`ui-rounded`/`ui-monospace`. Web uses CSS variables (`--font-display`, etc.). Android/default uses standard names.

## Layout Constants

- `BottomTabInset`: 92 (iOS), 88 (Android/default)
- `MaxContentWidth`: 1200
