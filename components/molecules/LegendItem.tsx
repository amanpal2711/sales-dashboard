import React from 'react';

export interface LegendItemProps {
  color: string;
  label: string;
  value?: string | number;
  className?: string;
}

export const LegendItem: React.FC<LegendItemProps> = ({
  color,
  label,
  value,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-700">{label}</span>
      {value !== undefined && (
        <span className="text-sm font-medium text-gray-900 ml-auto">
          {value}
        </span>
      )}
    </div>
  );
};
