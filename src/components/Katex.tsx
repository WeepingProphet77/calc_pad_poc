import { useMemo } from 'react';
import katex from 'katex';

type Props = {
  expr: string;
  block?: boolean;
  className?: string;
};

export function Katex({ expr, block = false, className }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(expr, {
        displayMode: block,
        throwOnError: false,
        strict: 'ignore',
        output: 'html',
      });
    } catch (err) {
      return `<span style="color:#b91c1c">KaTeX error: ${(err as Error).message}</span>`;
    }
  }, [expr, block]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
