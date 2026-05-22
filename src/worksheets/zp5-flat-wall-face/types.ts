export type ConfinementOption = 'no' | 'yes';

export interface ZP5Inputs {
  // Materials
  F_exx: number; // ksi
  f_y: number; // ksi
  f_pl: number; // ksi
  f_ut: number; // ksi
  lambda: number;
  f_c: number; // psi

  // Joint & weld
  d_joint: number; // in
  a: number; // in
  b: number; // in
  d: number; // in

  // Field plate
  t_pl: number;
  l_p: number;
  w_p: number;

  // Embed / stud / rebar
  h_ef: number;
  d_e1: number;
  d_o: number;
  e: number;
  A_s: number;
  n: number;
  A_se: number;
  A_brg: number;
  e_i: number;
  SED: number;

  // Cracking & confinement
  C_crb: number;
  C_crp: number;
  C_vcr: number;
  confinementX: ConfinementOption; // affects phi for breakout (0.70 vs 0.75)
  confinementY: ConfinementOption; // typically yes => 0.75
}

export interface ZP5Results {
  // Weld
  l_w: number;
  t_w: number;
  f_n: number;
  phi_fn: number;
  S: number;
  z_w: number;
  X_w: number;
  I_p: number;
  y_w: number;
  Y_w: number;
  Z_w: number;

  // Plate
  A_pl: number;
  e_pl: number;
  phi_Vnx: number;
  phi_Vbx: number;
  X_pl: number;
  phi_Vny: number;
  phi_Vby: number;
  Y_pl: number;
  Z_pl: number;

  // Embed
  g: number;
  phi_Ns: number;
  C_bs: number;
  Psi_edN: number;
  phi_Ncb: number;
  phi_Nph: number;
  phi_Nsb: number;
  phiBreakout: number;
  X_pc: number;
  BED: number;
  V_co1: number;
  phi_Vc1: number;
  phi_Vs: number;
  phi_Tb: number;
  phi_Cb: number;
  e_t: number;
  e_c: number;
  phi_Vbm: number;
  Y_pc: number;
  phi_Tn: number;
  Z_pc: number;

  // Assembly
  X: number;
  Y: number;
  Z: number;
  X_governs: string;
  Y_governs: string;
  Z_governs: string;
}
