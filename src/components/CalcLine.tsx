import { Katex } from './Katex';

type Props = {
  expr: string;
  description?: string;
  reference?: string;
};

export function CalcLine({ expr, description, reference }: Props) {
  return (
    <div className="calc-line">
      <div className="min-w-0 overflow-x-auto">
        <Katex expr={expr} />
      </div>
      <div className="desc">{description}</div>
      <div className="ref">{reference}</div>
    </div>
  );
}
