import { bisect } from '../../utils/solver';
import type { ZP5Inputs, ZP5Results } from './types';

export function computeZP5(I: ZP5Inputs): ZP5Results {
  // --- Weld ---
  const l_w = 2 * I.b + I.d;
  const t_w = I.a / Math.sqrt(2);
  const phiW = 0.75;
  const f_n = (0.6 * t_w * I.F_exx) / Math.sqrt(2); // kip/in
  const phi_fn = phiW * f_n;
  const S = (I.b * I.b * (2 * I.d + I.b)) / (3 * (I.d + I.b));
  const z_w = (I.b * I.b) / (2 * I.b + I.d);
  const X_w = phi_fn / (1 / l_w + (I.w_p - 2 * z_w) / (2 * S));

  const I_p =
    (Math.pow(I.d, 3) + 6 * I.l_p * I.l_p * I.b + 8 * Math.pow(I.b, 3)) / 12 -
    Math.pow(I.b, 4) / (2 * I.b + I.d);
  const y_w = I.l_p / 2;

  // Solve sqrt((V/lw + V*(wp-2zw)*(b-zw)/(2Ip))^2 + (V*(wp-2zw)*yw/(2Ip))^2) = phi_fn
  const yResid = (V: number) => {
    const t1 = V / l_w + (V * (I.w_p - 2 * z_w) * (I.b - z_w)) / (2 * I_p);
    const t2 = (V * (I.w_p - 2 * z_w) * y_w) / (2 * I_p);
    return Math.sqrt(t1 * t1 + t2 * t2) - phi_fn;
  };
  const Y_w = bisect(yResid, 0, 1000, 1e-9);

  const Z_w = phiW * f_n * l_w;

  // --- Field plate ---
  const A_pl = I.t_pl * I.l_p;
  const e_pl = I.w_p - 2 * I.b;
  const phiP = 0.9;
  const phi_Vnx = phiP * 0.6 * A_pl * I.f_pl;
  const phi_Vbx = (phiP * I.f_pl * ((I.l_p * I.t_pl * I.t_pl) / 4)) / (e_pl / 2);
  const X_pl = Math.min(phi_Vnx, phi_Vbx);
  const phi_Vny = phiP * 0.6 * A_pl * I.f_pl;
  const phi_Vby = (phiP * I.f_pl * ((I.l_p * I.l_p * I.t_pl) / 4)) / (e_pl / 2);
  const Y_pl = Math.min(phi_Vny, phi_Vby);
  const Z_pl = phiP * A_pl * I.f_pl;

  // --- Embed: X ---
  const g = I.d_e1 + I.d_joint / 2;
  const phi_Ns = 0.75 * I.A_se * I.f_ut;
  const phiBreakout = I.confinementX === 'yes' ? 0.75 : 0.7;
  const C_bs = 3.33 * I.lambda * Math.sqrt(I.f_c / I.h_ef);
  const Psi_edN = Math.min(0.7 + (0.3 * I.d_e1) / (1.5 * I.h_ef), 1.0);
  // Result in psi*in*in = lbs -> kips
  const phi_Ncb =
    (phiBreakout * C_bs * 3 * I.h_ef * (I.d_e1 + 1.5 * I.h_ef) * Psi_edN * I.C_crb) / 1000;
  const phi_Nph = (0.7 * 11.2 * I.A_brg * I.f_c * I.C_crp) / 1000;
  const phi_Nsb =
    (phiBreakout * 160 * I.d_e1 * Math.sqrt(I.A_brg) * Math.sqrt(I.f_c) * Psi_edN) / 1000;
  const X_pc = Math.min(phi_Ns, phi_Ncb, phi_Nph, phi_Nsb) / (1 + g / I.e_i);

  // --- Embed: Y ---
  const BED = I.SED / 0.2;
  const phiVcY = I.confinementY === 'yes' ? 0.75 : 0.7;
  const V_co1 =
    (87 *
      I.lambda *
      Math.sqrt(I.f_c) *
      Math.pow(I.d_e1, 1.33) *
      Math.pow(I.d_o, 0.75)) /
    1000;
  const phi_Vc1 = phiVcY * V_co1 * 1 * 1 * 1 * I.C_vcr;
  const phi_Vs = 0.65 * I.A_se * I.f_ut;
  const phi_t = 0.9;
  const phi_c = 0.65;
  const phi_Tb = phi_t * I.A_s * I.f_y;
  const phi_Cb = phi_c * I.A_s * I.f_y;
  const e_t = (phi_Cb * I.e) / (phi_Tb + phi_Cb);
  const e_c = (phi_Tb * I.e) / (phi_Tb + phi_Cb);
  const phi_Vbm = (phi_Tb * e_t + phi_Cb * e_c) / g;
  const Y_pc = Math.min(phi_Vc1, phi_Vs, phi_Vbm);

  // --- Embed: Z ---
  const phi_Tn = 0.9 * I.n * I.A_s * I.f_y;
  const Z_pc = phi_Tn;

  // --- Assembly ---
  const Xpair: Array<[number, string]> = [
    [X_pc, 'Precast embed'],
    [X_w, 'Weld'],
    [X_pl, 'Field plate'],
  ];
  const Ypair: Array<[number, string]> = [
    [Y_pc, 'Precast embed'],
    [Y_w, 'Weld'],
    [Y_pl, 'Field plate'],
  ];
  const Zpair: Array<[number, string]> = [
    [Z_pc, 'Precast embed'],
    [Z_w, 'Weld'],
    [Z_pl, 'Field plate'],
  ];
  const minPair = (arr: Array<[number, string]>) =>
    arr.reduce((a, c) => (c[0] < a[0] ? c : a), arr[0]);
  const [Xv, Xg] = minPair(Xpair);
  const [Yv, Yg] = minPair(Ypair);
  const [Zv, Zg] = minPair(Zpair);

  return {
    l_w,
    t_w,
    f_n,
    phi_fn,
    S,
    z_w,
    X_w,
    I_p,
    y_w,
    Y_w,
    Z_w,
    A_pl,
    e_pl,
    phi_Vnx,
    phi_Vbx,
    X_pl,
    phi_Vny,
    phi_Vby,
    Y_pl,
    Z_pl,
    g,
    phi_Ns,
    C_bs,
    Psi_edN,
    phi_Ncb,
    phi_Nph,
    phi_Nsb,
    phiBreakout,
    X_pc,
    BED,
    V_co1,
    phi_Vc1,
    phi_Vs,
    phi_Tb,
    phi_Cb,
    e_t,
    e_c,
    phi_Vbm,
    Y_pc,
    phi_Tn,
    Z_pc,
    X: Xv,
    Y: Yv,
    Z: Zv,
    X_governs: Xg,
    Y_governs: Yg,
    Z_governs: Zg,
  };
}
