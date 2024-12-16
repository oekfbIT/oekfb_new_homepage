import PropTypes from "prop-types";
import React, { useState } from "react";
import "./style.css";

interface Props {
  className?: string;
  dropdownWrapperClassName?: string;
  matLabelSelectAClassName?: string;
  text?: string;
  dropdownWrapperClassNameOverride?: string;
  placeholder?: string;
  options: any[]; // Dropdown options data
  displayKey: string; // Key for displayed text
  valueKey: string; // Key for the returned value
  onChange: (value: string) => void; // Callback for value changes
}

export const Dropdown = ({
                           className,
                           dropdownWrapperClassName,
                           matLabelSelectAClassName,
                           text = "Select a region",
                           dropdownWrapperClassNameOverride,
                           placeholder = "Choose an option",
                           options = [],
                           displayKey,
                           valueKey,
                           onChange,
                         }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value);
  };

  return (
      <div className={`dropdown ${className}`}>
        <div className="dropdown-wrapper">
          <div className="dropdown-wrapper-2">
            <div
                className={`mat-label-select-a-wrapper ${dropdownWrapperClassName}`}
            >
              <div className={`mat-label-select-a ${matLabelSelectAClassName}`}>
                {text}
              </div>
            </div>

            {/* Trigger with existing styling */}
            <div className="dropdown-wrapper-3" onClick={toggleDropdown}>
              <div
                  className={`dropdown-wrapper-4 ${dropdownWrapperClassNameOverride}`}
              >
                {selectedValue
                    ? options.find((opt) => opt[valueKey] === selectedValue)?.[displayKey]
                    : placeholder}
              </div>
              <img
                  className="dropdown-wrapper-5"
                  alt="Dropdown wrapper"
                  src="/img/dropdown-wrapper-icon.svg"
              />
            </div>
          </div>
        </div>

        {/* Dropdown options list */}
        {isOpen && (
            <div className="dropdown-wrapper-6">
              <ul className="dropdown-options">
                {options.map((option) => (
                    <li
                        key={option.id || option[valueKey]}
                        onClick={() => handleSelect(option[valueKey])}
                        className="dropdown-option-item"
                    >
                      {option[displayKey]}
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

Dropdown.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  displayKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  options: [],
};
