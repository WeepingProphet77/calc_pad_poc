import { useMemo, useState, type ReactNode } from 'react';
import { WorksheetLayout } from '../../components/WorksheetLayout';
import { InputField, SelectField, TextField } from '../../components/InputField';
import { defaultInputs } from './inputs';
import { computeZP5 } from './calc';
import { ZP5Sheet } from './Sheet';
import type { ZP5Inputs } from './types';
import type { ProjectInfo } from '../../components/TitleBlock';

export default function ZP5Worksheet() {
  const [inputs, setInputs] = useState<ZP5Inputs>(defaultInputs);
  const [project, setProject] = useState<ProjectInfo>({
    projectName: '',
    engineer: '',
    date: new Date().toISOString().slice(0, 10),
    checkedBy: '',
  });

  const results = useMemo(() => computeZP5(inputs), [inputs]);
  const set = <K extends keyof ZP5Inputs>(k: K, v: ZP5Inputs[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));

  return (
    <WorksheetLayout
      inputs={
        <div>
          <Group title="Project">
            <TextField
              label="Project Name"
              value={project.projectName}
              onChange={(v) => setProject({ ...project, projectName: v })}
            />
            <TextField
              label="Engineer"
              value={project.engineer}
              onChange={(v) => setProject({ ...project, engineer: v })}
            />
            <TextField
              label="Date"
              value={project.date}
              onChange={(v) => setProject({ ...project, date: v })}
            />
            <TextField
              label="Checked By"
              value={project.checkedBy}
              onChange={(v) => setProject({ ...project, checkedBy: v })}
            />
          </Group>

          <Group title="Materials">
            <InputField symbol="F_{exx}" description="weld electrode" unit="ksi" value={inputs.F_exx} onChange={(v) => set('F_exx', v)} />
            <InputField symbol="f_y" description="rebar yield" unit="ksi" value={inputs.f_y} onChange={(v) => set('f_y', v)} />
            <InputField symbol="f_{pl}" description="plate yield" unit="ksi" value={inputs.f_pl} onChange={(v) => set('f_pl', v)} />
            <InputField symbol="f_{ut}" description="HCA steel ult." unit="ksi" value={inputs.f_ut} onChange={(v) => set('f_ut', v)} />
            <InputField symbol="\\lambda" description="conc. weight" value={inputs.lambda} onChange={(v) => set('lambda', v)} />
            <InputField symbol="f'_c" description="conc. strength" unit="psi" value={inputs.f_c} onChange={(v) => set('f_c', v)} />
          </Group>

          <Group title="Joint & Weld">
            <InputField symbol="d_{joint}" description="joint width" unit="in" value={inputs.d_joint} onChange={(v) => set('d_joint', v)} />
            <InputField symbol="a" description="fillet leg" unit="in" value={inputs.a} onChange={(v) => set('a', v)} />
            <InputField symbol="b" description="return length" unit="in" value={inputs.b} onChange={(v) => set('b', v)} />
            <InputField symbol="d" description="weld height" unit="in" value={inputs.d} onChange={(v) => set('d', v)} />
          </Group>

          <Group title="Field Plate">
            <InputField symbol="t_{pl}" description="plate thickness" unit="in" value={inputs.t_pl} onChange={(v) => set('t_pl', v)} />
            <InputField symbol="l_p" description="plate length" unit="in" value={inputs.l_p} onChange={(v) => set('l_p', v)} />
            <InputField symbol="w_p" description="plate width" unit="in" value={inputs.w_p} onChange={(v) => set('w_p', v)} />
          </Group>

          <Group title="Embed / Stud / Rebar">
            <InputField symbol="h_{ef}" description="embedment depth" unit="in" value={inputs.h_ef} onChange={(v) => set('h_ef', v)} />
            <InputField symbol="d_{e1}" description="stud edge dist." unit="in" value={inputs.d_e1} onChange={(v) => set('d_e1', v)} />
            <InputField symbol="d_o" description="stud diameter" unit="in" value={inputs.d_o} onChange={(v) => set('d_o', v)} />
            <InputField symbol="e" description="dist. between bars" unit="in" value={inputs.e} onChange={(v) => set('e', v)} />
            <InputField symbol="A_s" description="area of one bar" unit="in²" value={inputs.A_s} onChange={(v) => set('A_s', v)} />
            <InputField symbol="n" description="# of bars" value={inputs.n} onChange={(v) => set('n', v)} step={1} />
            <InputField symbol="A_{se}" description="stud area" unit="in²" value={inputs.A_se} onChange={(v) => set('A_se', v)} />
            <InputField symbol="A_{brg}" description="stud bearing area" unit="in²" value={inputs.A_brg} onChange={(v) => set('A_brg', v)} />
            <InputField symbol="e_i" description="stud to back edge" unit="in" value={inputs.e_i} onChange={(v) => set('e_i', v)} />
            <InputField symbol="SED" description="side edge dist." unit="in" value={inputs.SED} onChange={(v) => set('SED', v)} />
          </Group>

          <Group title="Cracking & Confinement">
            <InputField symbol="C_{crb}" description="breakout cracking" value={inputs.C_crb} onChange={(v) => set('C_crb', v)} />
            <InputField symbol="C_{crp}" description="pullout cracking" value={inputs.C_crp} onChange={(v) => set('C_crp', v)} />
            <InputField symbol="C_{vcr}" description="shear cracking" value={inputs.C_vcr} onChange={(v) => set('C_vcr', v)} />
            <SelectField
              symbol="\\text{Confinement (X)}"
              description="tension breakout"
              value={inputs.confinementX}
              onChange={(v) => set('confinementX', v as 'yes' | 'no')}
              options={[
                { value: 'no', label: 'No (φ = 0.70)' },
                { value: 'yes', label: 'Yes (φ = 0.75)' },
              ]}
            />
            <SelectField
              symbol="\\text{Confinement (Y)}"
              description="vertical shear"
              value={inputs.confinementY}
              onChange={(v) => set('confinementY', v as 'yes' | 'no')}
              options={[
                { value: 'yes', label: 'Yes (φ = 0.75)' },
                { value: 'no', label: 'No (φ = 0.70)' },
              ]}
            />
          </Group>
        </div>
      }
      sheet={<ZP5Sheet inputs={inputs} results={results} project={project} />}
    />
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-wide font-semibold text-wells mb-2 border-b border-gray-200 pb-1">
        {title}
      </div>
      {children}
    </div>
  );
}
