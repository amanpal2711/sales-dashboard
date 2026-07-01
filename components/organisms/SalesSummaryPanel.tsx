import React from 'react';
import { StatCard } from '../molecules/StatCard';
import { MonthlySales } from '@/lib/data/mockSales';

export interface SalesSummaryPanelProps {
  data: MonthlySales[];
  className?: string;
}

export const SalesSummaryPanel: React.FC<SalesSummaryPanelProps> = ({
  data,
  className = ''
}) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnitsSold = data.reduce((sum, item) => sum + item.unitsSold, 0);
  const averageRevenue = Math.round(totalRevenue / data.length);
  
  const bestMonth = data.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  , data[0]);
  
  const worstMonth = data.reduce((worst, current) => 
    current.revenue < worst.revenue ? current : worst
  , data[0]);
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <StatCard
        title="Total Revenue"
        value={`$${(totalRevenue / 1000).toFixed(0)}k`}
        change={15}
        changeType="increase"
      />
      <StatCard
        title="Average Monthly Revenue"
        value={`$${(averageRevenue / 1000).toFixed(0)}k`}
      />
      <StatCard
        title="Total Units Sold"
        value={totalUnitsSold.toLocaleString()}
      />
      <StatCard
        title="Best Month"
        value={bestMonth.month}
        change={Math.round((bestMonth.revenue / averageRevenue - 1) * 100)}
        changeType="increase"
      />
    </div>
  );
};
