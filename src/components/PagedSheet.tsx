import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

const DPI = 96;
const PAGE_W_IN = 8.5;
const PAGE_H_IN = 11;
const PAGE_PAD_IN = 0.6;
const FOOTER_RESERVE_IN = 0.55;
// Subtract a small safety buffer so content reliably fits inside the
// printable area even when print rendering shifts line heights slightly
// vs. screen rendering.
const PRINT_SAFETY_IN = 0.3;
// Vertical chrome from the calc-grid-body wrapper (2px border top/bottom
// + 10px padding top/bottom).
const BODY_CHROME_PX = 24;
// Horizontal chrome from the same wrapper, used so the hidden measurement
// layer matches the actual rendered width and reflows identically.
const BODY_CHROME_X_PX = 28;

type Props = {
  header: ReactNode;
  children: ReactNode;
};

export function PagedSheet({ header, children }: Props) {
  const blocks = Children.toArray(children);
  const bodyMeasureRef = useRef<HTMLDivElement>(null);
  const headerMeasureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[][]>([blocks.map((_, i) => i)]);

  useEffect(() => {
    const measure = () => {
      const bodyEl = bodyMeasureRef.current;
      const headerEl = headerMeasureRef.current;
      if (!bodyEl || !headerEl) return;
      const headerH = headerEl.offsetHeight;
      const usablePerPage =
        (PAGE_H_IN - PAGE_PAD_IN * 2 - FOOTER_RESERVE_IN - PRINT_SAFETY_IN) * DPI -
        headerH -
        BODY_CHROME_PX;
      const items = Array.from(bodyEl.children) as HTMLElement[];
      const heights = items.map((el) => el.offsetHeight);
      const next: number[][] = [[]];
      let used = 0;
      heights.forEach((h, i) => {
        const cur = next[next.length - 1];
        if (used + h > usablePerPage && cur.length > 0) {
          next.push([]);
          used = 0;
        }
        next[next.length - 1].push(i);
        used += h;
      });
      setPages((prev) => (samePages(prev, next) ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (bodyMeasureRef.current) ro.observe(bodyMeasureRef.current);
    if (headerMeasureRef.current) ro.observe(headerMeasureRef.current);
    return () => ro.disconnect();
  }, []);

  const contentWidth = `${PAGE_W_IN - PAGE_PAD_IN * 2}in`;
  const bodyMeasureWidth = `calc(${contentWidth} - ${BODY_CHROME_X_PX}px)`;

  return (
    <>
      <div
        ref={headerMeasureRef}
        aria-hidden
        className="paged-measure"
        style={{ width: contentWidth }}
      >
        {header}
      </div>
      <div
        ref={bodyMeasureRef}
        aria-hidden
        className="paged-measure"
        style={{ width: bodyMeasureWidth }}
      >
        {blocks.map((b, i) => (
          <div key={i}>{b}</div>
        ))}
      </div>

      {pages.map((pageBlocks, pi) => (
        <section key={pi} className="paged-page">
          <div className="paged-header">{header}</div>
          <div className="calc-grid-body paged-body">
            {pageBlocks.map((bi) => (
              <div key={bi} className="paged-block">
                {blocks[bi]}
              </div>
            ))}
          </div>
          <div className="calc-footer">
            www.wells.build &nbsp;·&nbsp; Page {pi + 1} of {pages.length}
          </div>
        </section>
      ))}
    </>
  );
}

function samePages(a: number[][], b: number[][]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}
