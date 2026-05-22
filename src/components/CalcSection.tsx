import type { ReactNode } from 'react';

type Props = {
  title: string;
  level?: 1 | 2 | 3;
  children: ReactNode;
};

export function CalcSection({ title, level = 1, children }: Props) {
  return (
    <section className="calc-section mb-4">
      {level === 1 && <h2 className="section-heading text-lg">{title}</h2>}
      {level === 2 && <h3 className="subsection-heading text-base">{title}</h3>}
      {level === 3 && <h4 className="subsection-heading text-sm">{title}</h4>}
      <div>{children}</div>
    </section>
  );
}
