import { Suspense, useState } from 'react';
import { Sidebar } from './Sidebar';
import { worksheets } from '../worksheets';

export default function App() {
  const [activeId, setActiveId] = useState<string>(worksheets[0]?.id ?? '');
  const active = worksheets.find((w) => w.id === activeId);
  const ActiveComponent = active?.component;

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Loading worksheet…
          </div>
        }
      >
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a worksheet.
          </div>
        )}
      </Suspense>
    </div>
  );
}
