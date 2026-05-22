import { Katex } from './Katex';

type Props = {
  symbol: string;
  description: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function InputField({
  symbol,
  description,
  unit,
  value,
  onChange,
  min,
  max,
  step,
}: Props) {
  return (
    <label className="block mb-3">
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-sm text-gray-800">
          <Katex expr={symbol} />
          <span className="ml-2 text-gray-500 text-xs">{description}</span>
        </div>
      </div>
      <div className="mt-1 flex items-center">
        <input
          type="number"
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-wells-light"
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            if (!Number.isNaN(n)) onChange(n);
          }}
          min={min}
          max={max}
          step={step ?? 'any'}
        />
        {unit && <span className="ml-2 text-xs text-gray-500 w-12 shrink-0">{unit}</span>}
      </div>
    </label>
  );
}

type TextProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function TextField({ label, value, onChange }: TextProps) {
  return (
    <label className="block mb-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <input
        type="text"
        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-wells-light"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

type SelectProps = {
  symbol: string;
  description: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
};

export function SelectField({ symbol, description, value, options, onChange }: SelectProps) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-800">
        <Katex expr={symbol} />
        <span className="ml-2 text-gray-500 text-xs">{description}</span>
      </div>
      <select
        className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-wells-light"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
