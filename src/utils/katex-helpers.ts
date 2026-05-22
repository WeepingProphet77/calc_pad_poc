import { fmt, fmtUnit } from './format';

/** Definition line: `symbol = value unit` */
export function defLine(symbol: string, value: number | string, unit = ''): string {
  const v = typeof value === 'number' ? fmt(value) : value;
  return `${symbol} = ${v}${unit ? fmtUnit(unit) : ''}`;
}

/** Calc line showing: symbol = formula = substituted = result unit */
export function calcLine(
  symbol: string,
  formula: string,
  substituted: string,
  result: number,
  unit = '',
  digits = 3
): string {
  return `${symbol} = ${formula} = ${substituted} = ${fmt(result, digits)}${unit ? fmtUnit(unit) : ''}`;
}

/** Calc line without substituted form: symbol = formula = result */
export function calcLine2(
  symbol: string,
  formula: string,
  result: number,
  unit = '',
  digits = 3
): string {
  return `${symbol} = ${formula} = ${fmt(result, digits)}${unit ? fmtUnit(unit) : ''}`;
}

/** Min line: symbol = min(a, b, c) = result */
export function minLine(
  symbol: string,
  args: Array<{ name: string; value: number }>,
  result: number,
  unit = '',
  digits = 3
): string {
  const names = args.map((a) => a.name).join(', ');
  const vals = args.map((a) => fmt(a.value, digits)).join(', ');
  return `${symbol} = \\min(${names}) = \\min(${vals}) = ${fmt(result, digits)}${unit ? fmtUnit(unit) : ''}`;
}
