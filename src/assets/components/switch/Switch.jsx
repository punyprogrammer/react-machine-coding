import React from "react";
import "./switch.css";

export default function Switch({
  isOn = false,
  onToggle = () => {},
  labelText = "",
  id = "switch",
  disabled = false,
  ariaLabel = "Toggle switch"
}) {
  const handleKeyDown = (e) => {
    // Allow toggling with Space or Enter keys for better accessibility
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onToggle(!isOn);
    }
  };

  return (
    <div className={`switch ${disabled ? "switch--disabled" : ""}`}>
      <label htmlFor={id} className="switch__label">
        <input
          type="checkbox"
          id={id}
          className="switch__input"
          checked={isOn}
          onChange={() => !disabled && onToggle(!isOn)}
          onKeyDown={handleKeyDown}
          role="switch"
          aria-checked={isOn}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          disabled={disabled}
        />
        <span className="switch__slider" aria-hidden="true" />
        {labelText && <span className="switch__text">{labelText}</span>}
      </label>
    </div>
  );
}