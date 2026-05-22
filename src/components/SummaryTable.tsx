import { Katex } from './Katex';
import { fmt } from '../utils/format';

export type SummaryRow = {
  direction: string;
  symbol: string;
  capacity: number;
  unit: string;
  governs: string;
  description: string;
};

export function SummaryTable({ rows, title }: { rows: SummaryRow[]; title?: string }) {
  return (
    <div className="mt-4">
      {title && <h3 className="section-heading text-lg">{title}</h3>}
      <table className="summary-table">
        <thead>
          <tr>
            <th>Direction</th>
            <th>Symbol</th>
            <th>Capacity</th>
            <th>Governs</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.direction}>
              <td className="font-semibold">{r.direction}</td>
              <td>
                <Katex expr={r.symbol} />
              </td>
              <td className="font-mono">
                {fmt(r.capacity)} {r.unit}
              </td>
              <td>{r.governs}</td>
              <td className="text-sm text-gray-700">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
