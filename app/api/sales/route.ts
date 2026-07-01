import { NextResponse } from 'next/server';
import { mockSalesData, getAvailableYears, getSalesByYear } from '@/lib/data/mockSales';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    
    // If year is specified, return data for that year
    if (yearParam) {
      const year = parseInt(yearParam);
      const yearData = getSalesByYear(year);
      
      if (yearData.length === 0) {
        return NextResponse.json(
          { error: 'No data found for the specified year' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        year,
        data: yearData
      });
    }
    
    // Otherwise return all data
    return NextResponse.json({
      availableYears: getAvailableYears(),
      allData: mockSalesData
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
