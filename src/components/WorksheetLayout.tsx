import type { ReactNode } from 'react';
import { PrintButton } from './PrintButton';

type Props = {
  inputs: ReactNode;
  sheet: ReactNode;
};

export function WorksheetLayout({ inputs, sheet }: Props) {
  return (
    <div className="flex-1 flex min-w-0 min-h-0">
      <aside className="no-print w-[320px] shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-800">Inputs</div>
          <PrintButton />
        </div>
        <div className="p-4">{inputs}</div>
      </aside>
      <main className="flex-1 min-w-0 overflow-y-auto bg-gray-100 print-root">
        <div className="mx-auto my-6 max-w-[8.5in] calc-sheet shadow-md border border-gray-200 px-12 py-10">
          {sheet}
        </div>
      </main>
    </div>
  );
}
