import type { ZP5Inputs } from './types';

export const defaultInputs: ZP5Inputs = {
  // Materials
  F_exx: 70,
  f_y: 60,
  f_pl: 36,
  f_ut: 65,
  lambda: 1.0,
  f_c: 6000,

  // Joint & weld
  d_joint: 0.625,
  a: 0.35,
  b: 1.0,
  d: 4.0,

  // Field plate
  t_pl: 0.375,
  l_p: 4.0,
  w_p: 4.0,

  // Embed / stud / rebar
  h_ef: 4.0,
  d_e1: 2.0,
  d_o: 0.5,
  e: 5.5,
  A_s: 0.2,
  n: 2,
  A_se: 0.2,
  A_brg: 0.59,
  e_i: 2.0,
  SED: 2.0,

  // Cracking & confinement
  C_crb: 1.0,
  C_crp: 1.0,
  C_vcr: 1.0,
  confinementX: 'no',
  confinementY: 'yes',
};
