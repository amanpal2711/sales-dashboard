import React from 'react';
import { Card } from '../atoms/Card';
import { Select, SelectOption } from '../atoms/Select';
import { FilterInput } from '../molecules/FilterInput';
import { ChartTypeSwitcher, ChartType } from '../molecules/ChartTypeSwitcher';

export interface ChartControlsProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  threshold: number;
  onThresholdChange: (threshold: number) => void;
  className?: string;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
  selectedYear,
  onYearChange,
  availableYears,
  chartType,
  onChartTypeChange,
  threshold,
  onThresholdChange,
  className = ''
}) => {
  const yearOptions: SelectOption[] = availableYears.map(year => ({
    value: year,
    label: year.toString()
  }));
  
  return (
    <Card className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select
            label="Select Year"
            options={yearOptions}
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
          />
        </div>
        
        <div>
          <FilterInput
            label="Sales Threshold ($)"
            value={threshold}
            onChange={onThresholdChange}
            min={0}
            step={5000}
            placeholder="Set threshold to highlight"
          />
        </div>
        
        <div className="flex flex-col justify-end">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Chart Type
          </label>
          <ChartTypeSwitcher
            currentType={chartType}
            onTypeChange={onChartTypeChange}
          />
        </div>
      </div>
    </Card>
  );
};
