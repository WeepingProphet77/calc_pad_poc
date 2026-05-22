export const WELD_ELECTRODES = {
  E60: { F_exx: 60 },
  E70: { F_exx: 70 },
  E80: { F_exx: 80 },
  E90: { F_exx: 90 },
} as const;

export const REBAR_AREAS: Record<string, number> = {
  '#3': 0.11,
  '#4': 0.2,
  '#5': 0.31,
  '#6': 0.44,
  '#7': 0.6,
  '#8': 0.79,
};

export const STUD_PROPERTIES: Record<string, { d: number; A_se: number; A_brg: number }> = {
  '3/8"': { d: 0.375, A_se: 0.11, A_brg: 0.33 },
  '1/2"': { d: 0.5, A_se: 0.2, A_brg: 0.59 },
  '5/8"': { d: 0.625, A_se: 0.31, A_brg: 0.92 },
  '3/4"': { d: 0.75, A_se: 0.44, A_brg: 1.32 },
  '7/8"': { d: 0.875, A_se: 0.6, A_brg: 1.79 },
  '1"': { d: 1.0, A_se: 0.79, A_brg: 2.36 },
};
