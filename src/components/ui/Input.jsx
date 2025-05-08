import React, { useState, forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      type = 'text',
      onChange,
      onBlur,
      value,
      placeholder = 'Enter text',
      className = '',
      label = 'Label',
      labelClassName = '',
      error = false,
      disabled = false,
      name,
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(!!value);

    const handleFocus = () => setIsActive(true);
    const handleBlur = (e) => {
      setIsActive(!!e.target.value);
      if (onBlur) onBlur(e);
    };

    return (
      <div className="relative w-full">
        <input
          type={type}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={isActive ? placeholder : ''}
          disabled={disabled}
          className={`
            h-10 rounded-md border px-4 py-2 text-gray-900
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : 'hover:border-primary/70'}
            ${className}
          `}
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
);

export default Input;
