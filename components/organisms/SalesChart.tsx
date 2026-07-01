'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card } from '../atoms/Card';
import { ChartType } from '../molecules/ChartTypeSwitcher';
import { MonthlySales } from '@/lib/data/mockSales';

export interface SalesChartProps {
  data: MonthlySales[];
  chartType: ChartType;
  threshold?: number;
  className?: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export const SalesChart: React.FC<SalesChartProps> = ({
  data,
  chartType,
  threshold,
  className = ''
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
            {threshold !== undefined && threshold > 0 && (
              <ReferenceLine
                y={threshold}
                label={`Threshold: $${threshold.toLocaleString()}`}
                stroke="#EF4444"
                strokeDasharray="5 5"
              />
            )}
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Revenue ($)"
            />
            {threshold !== undefined && threshold > 0 && (
              <ReferenceLine
                y={threshold}
                label={`Threshold: $${threshold.toLocaleString()}`}
                stroke="#EF4444"
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ month, revenue }) => `${month}: $${(revenue / 1000).toFixed(0)}k`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="revenue"
              nameKey="month"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
    }
  };
  
  return (
    <Card className={className}>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
