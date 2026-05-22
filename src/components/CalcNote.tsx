import type { ReactNode } from 'react';

export function CalcNote({ children }: { children: ReactNode }) {
  return <div className="calc-note">{children}</div>;
}
