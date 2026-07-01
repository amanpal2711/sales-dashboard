import React from 'react';
import { Card } from '../atoms/Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'increase',
  icon,
  className = ''
}) => {
  const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  const changeIcon = changeType === 'increase' ? '↑' : '↓';
  
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-sm mt-2 ${changeColor}`}>
              {changeIcon} {Math.abs(change)}% from previous period
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-4 p-3 bg-blue-50 rounded-full">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
