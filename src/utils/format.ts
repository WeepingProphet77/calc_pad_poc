export function fmt(n: number, digits = 3): string {
  if (!isFinite(n)) return String(n);
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  if (Math.abs(n) >= 100) return n.toFixed(1);
  if (Math.abs(n) >= 10) return n.toFixed(2);
  return n.toFixed(digits);
}

export function fmtUnit(unit: string): string {
  // Convert plain units like "in^2" to KaTeX-safe \text form
  // Allow caret superscripts to render as exponents
  if (!unit) return '';
  return `\\,\\text{${unit.replace(/\^(\d+)/g, '}^{$1}\\text{')}}`;
}
