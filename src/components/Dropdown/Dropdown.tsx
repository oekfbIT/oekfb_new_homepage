// AnimatedDropdown.tsx
// ---------------------------------------------------------------
// Accessible, animated dropdown styled like your purple sample,
// but using your global design tokens.
// - Smooth fold (scaleY + opacity) with reduced-motion fallback
// - Selected/hover/static states
// - Optional leading icon
// ---------------------------------------------------------------

import PropTypes from "prop-types";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "./style.css";

type Option = Record<string, any>;

interface Props {
  className?: string;
  label?: string;                 // top label (e.g., “Pro League”)
  placeholder?: string;
  options?: Option[];
  displayKey: string;
  valueKey: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange: (value: string) => void;
  width?: number | string;
  leadingIcon?: React.ReactNode;  // optional icon at the left of control
}

export const Dropdown: React.FC<Props> = ({
  className = "",
  label = "Select a league",
  placeholder = "Choose...",
  options = [],
  displayKey,
  valueKey,
  value,
  defaultValue = null,
  onChange,
  width,
  leadingIcon,
}) => {
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-list`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const isControlled = value !== undefined;
  const currentValue = (isControlled ? value : internalValue) ?? null;

  const items = useMemo(() => options.filter(Boolean), [options]);
  const selectedIndex = items.findIndex((o) => o?.[valueKey] === currentValue);
  const selectedOption = selectedIndex >= 0 ? items[selectedIndex] : null;
  const displayText = selectedOption?.[displayKey] ?? placeholder;

  const setValue = (next: string | null) => {
    if (!isControlled) setInternalValue(next);
    if (next !== null) onChange(next);
  };

  const toggle = () => setOpen((p) => !p);
  const close = () => setOpen(false);
  const selectByIndex = (idx: number) => {
    const opt = items[idx];
    if (!opt) return;
    setValue(opt[valueKey]);
    close();
    buttonRef.current?.focus();
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) close();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Keyboard
  const onButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  };
  const onListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); buttonRef.current?.focus(); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectByIndex(activeIndex); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(items.length - 1, Math.max(0, i + 1))); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(0, i - 1)); return; }
    if (e.key === "Home") { e.preventDefault(); setActiveIndex(0); return; }
    if (e.key === "End") { e.preventDefault(); setActiveIndex(items.length - 1); return; }
  };

  return (
    <div
      className={`select ${className}`}
      style={width ? ({ ["--select-width" as any]: typeof width === "number" ? `${width}px` : width }) : undefined}
    >
      <label id={labelId} className="select__label">{placeholder}</label>

      <button
        ref={buttonRef}
        type="button"
        className={`select__control ${open ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${id}-btn`}
        aria-controls={open ? listboxId : undefined}
        id={`${id}-btn`}
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
      >
        {leadingIcon && <span className="select__icon">{leadingIcon}</span>}
        <span className={`select__value ${selectedOption ? "is-selected" : ""}`}>
          {displayText}
        </span>
        <svg className={`select__chevron ${open ? "is-open" : ""}`} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <div className={`select__popover ${open ? "is-open" : ""}`}>
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="select__menu"
          ref={menuRef}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
        >
          {items.map((opt, idx) => {
            const val = opt[valueKey];
            const text = opt[displayKey];
            const selected = currentValue === val;
            const active = idx === activeIndex;

            return (
              <li
                key={opt.id ?? val ?? idx}
                role="option"
                aria-selected={selected}
                className={`select__option${selected ? " is-selected" : ""}${active ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => selectByIndex(idx)}
              >
                <span className="select__option-label">{text}</span>
                {selected && (
                  <svg className="select__check" viewBox="0 0 16 12" width="16" height="12" aria-hidden="true">
                    <path d="M1 7l4 4L15 1" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  displayKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  leadingIcon: PropTypes.node,
};

export default Dropdown;
