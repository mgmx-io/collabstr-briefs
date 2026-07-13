// Semantic tokens from the Collabstr design system (v2.0).
export const colors = {
  bgPrimary: "#FFFFFF",
  bgSecondary: "#F5F5F5",
  bgInverse: "#333333",
  bgError: "rgba(217, 45, 32, 0.08)",
  textDefault: "#333333",
  textSubtle: "#535862",
  textSubtlest: "#717680",
  textPlaceholder: "#A4A7AE",
  textInverse: "#FFFFFF",
  borderDefault: "#D5D7DA",
  borderSubtle: "#E9EAEB",
  borderStrong: "#414651",
  error: "#F04438",
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;
