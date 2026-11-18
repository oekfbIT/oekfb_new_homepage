type Option<T extends string> = { value: T; label: string };

export default function SegmentedControl<T extends string>({ options, value, onChange, small }: { options: Option<T>[]; value: T; onChange: (v: T) => void; small?: boolean }) {
  return (
    <div className={`ma-seg${small ? " ma-seg--small" : ""}`} role="tablist">
      {options.map((o) => (
        <button key={o.value} type="button" role="tab" aria-selected={o.value === value}
                className={o.value === value ? "is-active" : ""} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
