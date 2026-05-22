import { CalcLine } from '../../components/CalcLine';
import { CalcSection } from '../../components/CalcSection';
import { CalcNote } from '../../components/CalcNote';
import { SummaryTable } from '../../components/SummaryTable';
import { TitleBlock, type ProjectInfo } from '../../components/TitleBlock';
import { defLine, calcLine, calcLine2, minLine } from '../../utils/katex-helpers';
import { fmt } from '../../utils/format';
import type { ZP5Inputs, ZP5Results } from './types';

type Props = {
  inputs: ZP5Inputs;
  results: ZP5Results;
  project: ProjectInfo;
};

export function ZP5Sheet({ inputs: I, results: R, project }: Props) {
  return (
    <div>
      <TitleBlock
        title="Flat Wall Panel to Flat Wall Panel Face Connection"
        reference="5.3.2.2.ZP5"
        project={project}
      />

      <CalcSection title="1. Design Assumptions">
        <CalcLine expr={defLine('F_{exx}', I.F_exx, 'ksi')} description="weld electrode strength" />
        <CalcLine expr={defLine('f_y', I.f_y, 'ksi')} description="rebar yield strength" />
        <CalcLine expr={defLine('f_{pl}', I.f_pl, 'ksi')} description="plate yield strength" />
        <CalcLine expr={defLine('f_{ut}', I.f_ut, 'ksi')} description="HCA steel ultimate strength" />
        <CalcLine expr={defLine('\\lambda', I.lambda)} description="concrete weight factor" />
        <CalcLine expr={defLine("f'_c", I.f_c, 'psi')} description="precast concrete strength" />
        <CalcLine expr={defLine('d_{joint}', I.d_joint, 'in')} description="joint width" />
        <CalcLine expr={defLine('a', I.a, 'in')} description="fillet weld leg size" />
        <CalcLine expr={defLine('b', I.b, 'in')} description="weld return length" />
        <CalcLine expr={defLine('d', I.d, 'in')} description="weld vertical height" />
        <CalcLine expr={defLine('t_{pl}', I.t_pl, 'in')} description="plate thickness" />
        <CalcLine expr={defLine('l_p', I.l_p, 'in')} description="length of field plate" />
        <CalcLine expr={defLine('w_p', I.w_p, 'in')} description="width of field plate" />
        <CalcLine expr={defLine('h_{ef}', I.h_ef, 'in')} description="effective embedment depth" />
        <CalcLine expr={defLine('d_{e1}', I.d_e1, 'in')} description="stud edge distance" />
        <CalcLine expr={defLine('d_o', I.d_o, 'in')} description="stud diameter" />
        <CalcLine expr={defLine('e', I.e, 'in')} description="distance between rebars" />
        <CalcLine expr={defLine('A_s', I.A_s, 'in^2')} description="area of one rebar" />
        <CalcLine expr={defLine('n', I.n)} description="number of rebars" />
        <CalcLine expr={defLine('A_{se}', I.A_se, 'in^2')} description="stud cross-sectional area" />
        <CalcLine expr={defLine('A_{brg}', I.A_brg, 'in^2')} description="stud bearing area" />
        <CalcLine expr={defLine('e_i', I.e_i, 'in')} description="stud to back edge of plate" />
        <CalcLine expr={defLine('SED', I.SED, 'in')} description="side edge distance" />
      </CalcSection>

      <CalcSection title="2. Weld between plate and precast embed (weld 1)">
        <CalcSection level={2} title="X Capacity (out-of-plane shear)">
          <CalcLine
            expr={calcLine('l_w', '2b + d', `2(${fmt(I.b)}) + ${fmt(I.d)}`, R.l_w, 'in')}
            description="total weld length"
          />
          <CalcLine
            expr={calcLine(
              't_w',
              '\\dfrac{a}{\\sqrt{2}}',
              `\\dfrac{${fmt(I.a)}}{\\sqrt{2}}`,
              R.t_w,
              'in'
            )}
            description="fillet weld throat"
          />
          <CalcLine expr={defLine('\\phi', 0.75)} description="LRFD weld resistance factor" />
          <CalcLine
            expr={calcLine(
              'f_n',
              '\\dfrac{0.6\\, t_w\\, F_{exx}}{\\sqrt{2}}',
              `\\dfrac{0.6(${fmt(R.t_w)})(${fmt(I.F_exx)})}{\\sqrt{2}}`,
              R.f_n,
              'kip/in'
            )}
            description="nominal weld strength per length"
            reference="[AISC J2]"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi f_n',
              `${fmt(0.75)} \\cdot ${fmt(R.f_n)}`,
              R.phi_fn,
              'kip/in'
            )}
            description="design weld strength per length"
          />
          <CalcLine
            expr={calcLine(
              'S',
              '\\dfrac{b^2(2d+b)}{3(d+b)}',
              `\\dfrac{${fmt(I.b)}^2 (2 \\cdot ${fmt(I.d)} + ${fmt(I.b)})}{3(${fmt(I.d)} + ${fmt(I.b)})}`,
              R.S,
              'in^2'
            )}
            description="weld group section modulus"
          />
          <CalcLine
            expr={calcLine(
              'z_w',
              '\\dfrac{b^2}{2b+d}',
              `\\dfrac{${fmt(I.b)}^2}{2 \\cdot ${fmt(I.b)} + ${fmt(I.d)}}`,
              R.z_w,
              'in'
            )}
            description="weld group centroid"
          />
          <CalcLine
            expr={calcLine2(
              'X_w',
              `\\dfrac{\\phi f_n}{\\dfrac{1}{l_w} + \\dfrac{w_p - 2 z_w}{2 S}}`,
              R.X_w,
              'kip'
            )}
            description="Weld X capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Y Capacity (vertical bearing)">
          <CalcLine
            expr={calcLine(
              'I_p',
              '\\dfrac{d^3 + 6 l_p^2 b + 8 b^3}{12} - \\dfrac{b^4}{2b+d}',
              `\\dfrac{${fmt(I.d)}^3 + 6(${fmt(I.l_p)})^2(${fmt(I.b)}) + 8(${fmt(I.b)})^3}{12} - \\dfrac{${fmt(I.b)}^4}{2(${fmt(I.b)})+${fmt(I.d)}}`,
              R.I_p,
              'in^4'
            )}
            description="weld polar moment of inertia"
          />
          <CalcLine
            expr={calcLine('y_w', '\\dfrac{l_p}{2}', `\\dfrac{${fmt(I.l_p)}}{2}`, R.y_w, 'in')}
            description="distance from centroid to critical point"
          />
          <CalcNote>
            <strong>Iterative solution.</strong> The unknown V<sub>y</sub> appears on both sides of
            the constraint equation under a radical. The solver finds V<sub>y</sub> such that the
            combined stress demand equals the design weld strength per length.
          </CalcNote>
          <CalcLine
            expr={`\\sqrt{\\left(\\dfrac{V_y}{l_w} + \\dfrac{V_y (w_p - 2 z_w)(b - z_w)}{2 I_p}\\right)^2 + \\left(\\dfrac{V_y (w_p - 2 z_w)\\, y_w}{2 I_p}\\right)^2} = \\phi f_n`}
            description="constraint equation (solve for V_y)"
          />
          <CalcLine
            expr={`Y_w = \\operatorname{Find}(V_y) = ${fmt(R.Y_w)}${'\\,\\text{kip}'}`}
            description="Weld Y capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Z Capacity (in-plane shear)">
          <CalcLine
            expr={calcLine(
              'Z_w',
              '\\phi f_n l_w',
              `${fmt(0.75)} \\cdot ${fmt(R.f_n)} \\cdot ${fmt(R.l_w)}`,
              R.Z_w,
              'kip'
            )}
            description="Weld Z capacity"
          />
        </CalcSection>
      </CalcSection>

      <CalcSection title="3. Field Plate">
        <CalcLine
          expr={calcLine(
            'A_{pl}',
            't_{pl} l_p',
            `${fmt(I.t_pl)} \\cdot ${fmt(I.l_p)}`,
            R.A_pl,
            'in^2'
          )}
          description="cross-sectional area"
        />
        <CalcLine
          expr={calcLine(
            'e_{pl}',
            'w_p - 2b',
            `${fmt(I.w_p)} - 2(${fmt(I.b)})`,
            R.e_pl,
            'in'
          )}
          description="bending length between welds"
        />
        <CalcLine expr={defLine('\\phi', 0.9)} description="LRFD steel resistance factor" />

        <CalcSection level={2} title="X Capacity (out-of-plane shear)">
          <CalcLine
            expr={calcLine2('\\phi V_{nx}', '\\phi \\cdot 0.6 A_{pl} f_{pl}', R.phi_Vnx, 'kip')}
            description="shear capacity"
            reference="[AISC J4.2]"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi V_{bx}',
              '\\phi f_{pl} \\dfrac{l_p t_{pl}^2 / 4}{e_{pl}/2}',
              R.phi_Vbx,
              'kip'
            )}
            description="bending capacity"
          />
          <CalcLine
            expr={minLine(
              'X_{pl}',
              [
                { name: '\\phi V_{nx}', value: R.phi_Vnx },
                { name: '\\phi V_{bx}', value: R.phi_Vbx },
              ],
              R.X_pl,
              'kip'
            )}
            description="Field plate X capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Y Capacity (vertical bearing)">
          <CalcLine
            expr={calcLine2('\\phi V_{ny}', '\\phi \\cdot 0.6 A_{pl} f_{pl}', R.phi_Vny, 'kip')}
            description="shear capacity"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi V_{by}',
              '\\phi f_{pl} \\dfrac{l_p^2 t_{pl} / 4}{e_{pl}/2}',
              R.phi_Vby,
              'kip'
            )}
            description="bending capacity"
          />
          <CalcLine
            expr={minLine(
              'Y_{pl}',
              [
                { name: '\\phi V_{ny}', value: R.phi_Vny },
                { name: '\\phi V_{by}', value: R.phi_Vby },
              ],
              R.Y_pl,
              'kip'
            )}
            description="Field plate Y capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Z Capacity (in-plane shear)">
          <CalcLine
            expr={calcLine('Z_{pl}', '\\phi A_{pl} f_{pl}', `0.9 \\cdot ${fmt(R.A_pl)} \\cdot ${fmt(I.f_pl)}`, R.Z_pl, 'kip')}
            description="plate tension capacity"
          />
        </CalcSection>
      </CalcSection>

      <CalcSection title="4. Embed in Precast Concrete">
        <CalcLine
          expr={calcLine(
            'g',
            'd_{e1} + \\dfrac{d_{joint}}{2}',
            `${fmt(I.d_e1)} + \\dfrac{${fmt(I.d_joint)}}{2}`,
            R.g,
            'in'
          )}
          description="distance from joint center to stud"
        />

        <CalcSection level={2} title="X Capacity (out-of-plane shear)">
          <CalcNote>
            The X force is applied at the center of the joint. A couple between the stud and back
            edge of plate resists the moment. This simplifies the actual load path where the weld
            applies both a moment and force onto the plate, and the moment increases due to the
            distance between the weld centroid and stud.
          </CalcNote>
          <CalcLine expr={defLine('\\phi', 0.75)} description="steel resistance factor" />
          <CalcLine
            expr={calcLine(
              '\\phi N_s',
              '\\phi A_{se} f_{ut}',
              `0.75 \\cdot ${fmt(I.A_se)} \\cdot ${fmt(I.f_ut)}`,
              R.phi_Ns,
              'kip'
            )}
            description="stud steel tension strength"
            reference="[ACI 318-19 §17.6.1]"
          />
          <CalcLine
            expr={defLine('\\phi', R.phiBreakout)}
            description={`breakout factor (${I.confinementX === 'yes' ? 'confinement: yes' : 'no confinement'})`}
          />
          <CalcLine
            expr={calcLine(
              'C_{bs}',
              "3.33 \\lambda \\sqrt{f'_c / h_{ef}}",
              `3.33(${fmt(I.lambda)})\\sqrt{${fmt(I.f_c)} / ${fmt(I.h_ef)}}`,
              R.C_bs,
              'psi'
            )}
            description="breakout strength coefficient"
            reference="[ACI 318-19 §17.6.2]"
          />
          <CalcLine
            expr={calcLine2(
              '\\Psi_{ed,N}',
              '\\min\\!\\left(0.7 + \\dfrac{0.3\\, d_{e1}}{1.5 h_{ef}},\\ 1.0\\right)',
              R.Psi_edN
            )}
            description="edge distance modifier"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi N_{cb}',
              '\\phi\\, C_{bs}\\, 3 h_{ef}(d_{e1} + 1.5 h_{ef})\\, \\Psi_{ed,N}\\, C_{crb}',
              R.phi_Ncb,
              'kip'
            )}
            description="concrete breakout strength"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi N_{ph}',
              "0.70 \\cdot 11.2\\, A_{brg}\\, f'_c\\, C_{crp}",
              R.phi_Nph,
              'kip'
            )}
            description="pullout strength"
            reference="[ACI 318-19 §17.6.3]"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi N_{sb}',
              "\\phi \\cdot 160\\, d_{e1}\\, \\sqrt{A_{brg}}\\, \\sqrt{f'_c}\\, \\Psi_{ed,N}",
              R.phi_Nsb,
              'kip'
            )}
            description="side-face blowout strength"
            reference="[ACI 318-19 §17.6.4]"
          />
          <CalcLine
            expr={calcLine2(
              'X_{pc}',
              `\\dfrac{\\min(\\phi N_s, \\phi N_{cb}, \\phi N_{ph}, \\phi N_{sb})}{1 + g/e_i}`,
              R.X_pc,
              'kip'
            )}
            description="Precast embed X capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Y Capacity (vertical bearing)">
          <CalcLine
            expr={calcLine('BED', 'SED / 0.2', `${fmt(I.SED)} / 0.2`, R.BED, 'in')}
            description="back edge distance check"
          />
          <CalcLine
            expr={defLine('\\phi', I.confinementY === 'yes' ? 0.75 : 0.7)}
            description={`shear resistance factor (${I.confinementY === 'yes' ? 'confinement reinforcing' : 'no confinement'})`}
          />
          <CalcLine
            expr={calcLine2(
              'V_{co1}',
              "87 \\lambda \\sqrt{f'_c}\\, d_{e1}^{1.33}\\, d_o^{0.75}",
              R.V_co1,
              'kip'
            )}
            description="single stud concrete shear (PCI)"
            reference="[PCI Handbook]"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi V_{c1}',
              '\\phi\\, V_{co1}\\, C_{X1} C_{Y1} C_{ev1} C_{vcr}',
              R.phi_Vc1,
              'kip'
            )}
            description="design concrete shear strength"
          />
          <CalcLine expr={defLine('\\phi', 0.65)} description="steel shear factor" />
          <CalcLine
            expr={calcLine2('\\phi V_s', '\\phi A_{se} f_{ut}', R.phi_Vs, 'kip')}
            description="stud steel shear"
          />
          <CalcLine
            expr={calcLine2('\\phi T_b', '\\phi_t A_s f_y', R.phi_Tb, 'kip')}
            description="tension bar capacity"
          />
          <CalcLine
            expr={calcLine2('\\phi C_b', '\\phi_c A_s f_y', R.phi_Cb, 'kip')}
            description="compression bar capacity"
          />
          <CalcLine
            expr={calcLine2('e_t', '\\dfrac{\\phi C_b \\cdot e}{\\phi T_b + \\phi C_b}', R.e_t, 'in')}
            description="tension bar lever arm"
          />
          <CalcLine
            expr={calcLine2('e_c', '\\dfrac{\\phi T_b \\cdot e}{\\phi T_b + \\phi C_b}', R.e_c, 'in')}
            description="compression bar lever arm"
          />
          <CalcLine
            expr={calcLine2(
              '\\phi V_{bm}',
              '\\dfrac{\\phi T_b \\cdot e_t + \\phi C_b \\cdot e_c}{g}',
              R.phi_Vbm,
              'kip'
            )}
            description="bar moment capacity as shear"
          />
          <CalcLine
            expr={minLine(
              'Y_{pc}',
              [
                { name: '\\phi V_{c1}', value: R.phi_Vc1 },
                { name: '\\phi V_s', value: R.phi_Vs },
                { name: '\\phi V_{bm}', value: R.phi_Vbm },
              ],
              R.Y_pc,
              'kip'
            )}
            description="Precast embed Y capacity"
          />
        </CalcSection>

        <CalcSection level={2} title="Z Capacity (in-plane shear)">
          <CalcLine expr={defLine('\\phi', 0.9)} description="tension resistance factor" />
          <CalcLine
            expr={calcLine(
              '\\phi T_n',
              '\\phi\\, n\\, A_s\\, f_y',
              `0.9(${I.n})(${fmt(I.A_s)})(${fmt(I.f_y)})`,
              R.phi_Tn,
              'kip'
            )}
            description="rebar tension capacity"
          />
          <CalcLine
            expr={calcLine2('Z_{pc}', '\\phi T_n', R.Z_pc, 'kip')}
            description="Precast embed Z capacity"
          />
        </CalcSection>
      </CalcSection>

      <CalcSection title="5. Connection Assembly Capacities">
        <SummaryTable
          rows={[
            {
              direction: 'X',
              symbol: 'X = \\min(X_{pc}, X_w, X_{pl})',
              capacity: R.X,
              unit: 'kip',
              governs: R.X_governs,
              description: 'Out-of-plane shear',
            },
            {
              direction: 'Y',
              symbol: 'Y = \\min(Y_{pc}, Y_w, Y_{pl})',
              capacity: R.Y,
              unit: 'kip',
              governs: R.Y_governs,
              description: 'Vertical bearing',
            },
            {
              direction: 'Z',
              symbol: 'Z = \\min(Z_{pc}, Z_w, Z_{pl})',
              capacity: R.Z,
              unit: 'kip',
              governs: R.Z_governs,
              description: 'In-plane shear',
            },
          ]}
        />
      </CalcSection>
    </div>
  );
}
