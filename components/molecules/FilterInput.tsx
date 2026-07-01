import React from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

export interface FilterInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 1000,
  placeholder = 'Enter threshold value',
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else {
      onChange(0);
    }
  };
  
  return (
    <div className={`flex flex-col ${className}`}>
      <Label>{label}</Label>
      <Input
        type="number"
        value={value || ''}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="mt-1"
      />
    </div>
  );
};
