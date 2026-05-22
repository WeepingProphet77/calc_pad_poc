export type ProjectInfo = {
  projectName: string;
  engineer: string;
  date: string;
  checkedBy: string;
};

type Props = {
  title: string;
  reference: string;
  project: ProjectInfo;
};

export function TitleBlock({ title, reference, project }: Props) {
  return (
    <div className="title-block mb-6">
      <div className="brand flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-white text-wells font-bold text-xl px-3 py-1 tracking-widest">
            WELLS
          </div>
          <div className="text-sm uppercase tracking-wider opacity-90">
            Precast Connection Calculator
          </div>
        </div>
        <div className="text-xs opacity-90">{reference}</div>
      </div>
      <div className="px-4 py-2 border-t border-gray-800 bg-gray-50">
        <div className="text-base font-semibold text-gray-900">{title}</div>
      </div>
      <div className="grid grid-cols-4 text-sm">
        <Field label="Project" value={project.projectName} />
        <Field label="Engineer" value={project.engineer} />
        <Field label="Date" value={project.date} />
        <Field label="Checked By" value={project.checkedBy} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-1.5 border-t border-r border-gray-800 last:border-r-0">
      <div className="text-[0.65rem] uppercase tracking-wide text-gray-500">{label}</div>
      <div className="font-medium text-gray-900 min-h-[1.25rem]">{value || ' '}</div>
    </div>
  );
}
