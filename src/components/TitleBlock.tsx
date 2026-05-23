export type ProjectInfo = {
  projectName: string;
  jobNumber: string;
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
    <div className="title-block mb-4">
      <div className="flex items-start justify-between gap-6 px-1 pb-3">
        <img
          src={`${import.meta.env.BASE_URL}Wells_logos/Blue/Wells_Logo_Horizontal_Blue_Web.png`}
          alt="Wells"
          className="h-14 w-auto select-none"
        />
        <div className="font-mono text-[0.9rem] leading-tight text-gray-900 pt-1">
          <HeaderLine label="Job:" value={project.projectName} />
          <HeaderLine label="Job No.:" value={project.jobNumber} />
          <HeaderLine label="By:" value={project.engineer} />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-b border-wells px-1 py-1.5 mb-3">
        <div className="text-base font-semibold text-wells">{title}</div>
        <div className="text-xs text-gray-700 whitespace-nowrap">
          <span className="font-semibold">{reference}</span>
          {project.date && <span className="ml-3">Date: {project.date}</span>}
          {project.checkedBy && <span className="ml-3">Checked: {project.checkedBy}</span>}
        </div>
      </div>
    </div>
  );
}

function HeaderLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-16 shrink-0">{label}</span>
      <span className="min-w-[14rem] border-b border-gray-800 px-1 leading-tight">
        {value || ' '}
      </span>
    </div>
  );
}
