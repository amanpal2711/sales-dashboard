import React from 'react';
import { Badge } from '../atoms/Badge';

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  status?: string;
  className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  status,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-gray-600">{subtitle}</p>
          )}
        </div>
        {status && (
          <Badge variant="success" size="md">
            {status}
          </Badge>
        )}
      </div>
    </div>
  );
};
