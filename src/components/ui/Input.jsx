import React, { useEffect, useRef, useState } from 'react';

function Input({
  type = 'text',
  onChange,
  value = '',
  placeholder = 'Enter text',
  className = '',
  label = 'Label',
  labelClassName = '',
  error = false,
  disabled = false,
  name
}) {
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Determine if the input is "active" (has value or is focused)
  const updateActiveState = () => {
    setIsActive(!!inputRef.current.value || inputRef.current === document.activeElement);
  };

  // Handle controlled/uncontrolled value changes
  useEffect(() => {
    setIsActive(!!value); // Update on prop value change
  }, [value]);

  // Handle focus/blur to toggle active state
  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(!!inputRef.current.value);

  // Sync input value with controlled value prop
  useEffect(() => {
    if (value !== undefined && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        type={type}
        ref={inputRef}
        onChange={onChange}
        defaultValue={value} // For uncontrolled, fallback to controlled
        placeholder={isActive ? placeholder : ''} // Show placeholder only when active
        disabled={disabled}
        name={name}
        className={`
          h-10  rounded-md border px-4 py-2 text-gray-900
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'hover:border-primary/70'}
          ${className}
        `}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        className={`
          absolute left-4 pointer-events-none transition-all duration-200 ease-in-out
          ${isActive ? '-top-2 text-xs bg-white px-1 text-gray-600' : 'top-2.5 text-sm text-gray-500'}
          ${error && isActive ? 'text-red-500' : ''}
          ${disabled ? 'text-gray-400' : ''}
          ${labelClassName}
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;