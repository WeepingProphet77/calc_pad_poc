import { useMemo, useState } from 'react';
import { worksheets, groupByCategory, type WorksheetEntry } from '../worksheets';

type Props = {
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function Sidebar({ activeId, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return worksheets;
    return worksheets.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.reference.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = groupByCategory(filtered);

  return (
    <aside className="no-print w-[260px] shrink-0 bg-wells-dark text-white flex flex-col">
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="bg-white text-wells font-bold text-lg px-2 py-0.5 tracking-widest">
            WELLS
          </div>
          <div className="text-xs uppercase tracking-wider opacity-80">Connection Calc</div>
        </div>
      </div>
      <div className="p-3 border-b border-white/10">
        <input
          type="search"
          placeholder="Search worksheets…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded bg-white/10 placeholder-white/50 text-sm px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-3">
            <div className="px-4 text-[0.65rem] uppercase tracking-widest text-white/50 mb-1">
              {cat}
            </div>
            <ul>
              {items.map((w: WorksheetEntry) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(w.id)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition ${
                      activeId === w.id ? 'bg-white/15 border-l-2 border-white' : ''
                    }`}
                  >
                    <div className="font-medium leading-tight">{w.name}</div>
                    <div className="text-[0.7rem] text-white/60 mt-0.5">{w.reference}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-3 text-sm text-white/50">No worksheets match.</div>
        )}
      </nav>
      <div className="p-3 text-[0.65rem] text-white/40 border-t border-white/10">
        v0.1 · ZP5 reference
      </div>
    </aside>
  );
}
