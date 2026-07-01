'use client';

import { useState, useEffect } from 'react';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { SalesSummaryPanel } from '@/components/organisms/SalesSummaryPanel';
import { ChartControls } from '@/components/organisms/ChartControls';
import { SalesChart } from '@/components/organisms/SalesChart';
import { ChartType } from '@/components/molecules/ChartTypeSwitcher';
import { MonthlySales } from '@/lib/data/mockSales';

export default function DashboardPage() {
  const [salesData, setSalesData] = useState<MonthlySales[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesData();
  }, [selectedYear]);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/sales?year=${selectedYear}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
      
      const result = await response.json();
      setSalesData(result.data);
      
      // Fetch available years on first load
      if (availableYears.length === 0) {
        const allResponse = await fetch('/api/sales');
        const allResult = await allResponse.json();
        setAvailableYears(allResult.availableYears);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching sales data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate>
      <DashboardHeader
        title="Sales Analytics Dashboard"
        subtitle="Track your sales performance across different years and categories"
        status="Live"
      />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading sales data...</div>
        </div>
      ) : (
        <>
          <SalesSummaryPanel data={salesData} className="mb-6" />
          
          <ChartControls
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            availableYears={availableYears}
            chartType={chartType}
            onChartTypeChange={setChartType}
            threshold={threshold}
            onThresholdChange={setThreshold}
            className="mb-6"
          />
          
          <SalesChart
            data={salesData}
            chartType={chartType}
            threshold={threshold}
          />
        </>
      )}
    </DashboardTemplate>
  );
}
