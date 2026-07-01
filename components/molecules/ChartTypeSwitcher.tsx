import React from 'react';
import { Button } from '../atoms/Button';

export type ChartType = 'bar' | 'line' | 'pie';

export interface ChartTypeSwitcherProps {
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
  className?: string;
}

export const ChartTypeSwitcher: React.FC<ChartTypeSwitcherProps> = ({
  currentType,
  onTypeChange,
  className = ''
}) => {
  const chartTypes: { type: ChartType; label: string }[] = [
    { type: 'bar', label: 'Bar' },
    { type: 'line', label: 'Line' },
    { type: 'pie', label: 'Pie' }
  ];
  
  return (
    <div className={`flex gap-2 ${className}`}>
      {chartTypes.map(({ type, label }) => (
        <Button
          key={type}
          variant={currentType === type ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onTypeChange(type)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
