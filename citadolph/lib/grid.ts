/**
 * Grid System Configuration
 * Single source of truth for Müller-Brockmann grid parameters
 * All values in CSS custom properties for runtime access
 */

export const gridConfig = {
  cols: 12,
  gutter: 24,
  margin: 48,
  baseline: 8,
  leading: 24,
  maxWidth: 1280,
} as const;

export const gridCSSVars = {
  '--cols': String(gridConfig.cols),
  '--gutter': `${gridConfig.gutter}px`,
  '--margin': `${gridConfig.margin}px`,
  '--bl': `${gridConfig.baseline}px`,
  '--lh': `${gridConfig.leading}px`,
  '--maxw': `${gridConfig.maxWidth}px`,
} as const;

export type GridConfig = typeof gridConfig;