export interface SalesData {
  month: string;
  year: number;
  revenue: number;
  unitsSold: number;
  category: string;
}

export interface MonthlySales {
  month: string;
  revenue: number;
  unitsSold: number;
}

export interface YearlySales {
  year: number;
  data: MonthlySales[];
}

const categories = ['Electronics', 'Clothing', 'Groceries', 'Furniture'];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Generate realistic sales data with seasonal variation
// Higher sales in Nov/Dec (holiday season), moderate in summer, lower in early year
const generateYearlyData = (year: number, baseMultiplier: number = 1): MonthlySales[] => {
  return months.map((month, index) => {
    // Seasonal factors: higher in Nov/Dec, moderate in summer, lower in Q1
    let seasonalFactor = 1.0;
    
    if (index >= 10) {
      // Nov/Dec: holiday season boost
      seasonalFactor = 1.8 + Math.random() * 0.4;
    } else if (index >= 5 && index <= 7) {
      // Jun/Jul/Aug: summer boost
      seasonalFactor = 1.2 + Math.random() * 0.2;
    } else if (index <= 2) {
      // Jan/Feb/Mar: post-holiday dip
      seasonalFactor = 0.7 + Math.random() * 0.2;
    } else {
      // Other months: normal
      seasonalFactor = 0.9 + Math.random() * 0.3;
    }
    
    // Add some randomness
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    const baseRevenue = 45000 * baseMultiplier;
    const revenue = Math.round(baseRevenue * seasonalFactor * randomFactor);
    const unitsSold = Math.round(revenue / (80 + Math.random() * 40));
    
    return {
      month,
      revenue,
      unitsSold
    };
  });
};

// Generate data for each year with slight growth trend
const salesData: YearlySales[] = [
  {
    year: 2022,
    data: generateYearlyData(2022, 1.0)
  },
  {
    year: 2023,
    data: generateYearlyData(2023, 1.15) // 15% growth
  },
  {
    year: 2024,
    data: generateYearlyData(2024, 1.32) // 32% growth from 2022
  }
];

// Flatten data for category-based analysis
const generateCategoryData = (): SalesData[] => {
  const flatData: SalesData[] = [];
  
  salesData.forEach(({ year, data }) => {
    data.forEach(({ month, revenue, unitsSold }) => {
      // Distribute revenue across categories with different weights
      const categoryRevenue = {
        Electronics: revenue * 0.35,
        Clothing: revenue * 0.25,
        Groceries: revenue * 0.25,
        Furniture: revenue * 0.15
      };
      
      const categoryUnits = {
        Electronics: unitsSold * 0.2,
        Clothing: unitsSold * 0.4,
        Groceries: unitsSold * 0.3,
        Furniture: unitsSold * 0.1
      };
      
      categories.forEach(category => {
        flatData.push({
          month,
          year,
          revenue: Math.round(categoryRevenue[category as keyof typeof categoryRevenue]),
          unitsSold: Math.round(categoryUnits[category as keyof typeof categoryUnits]),
          category
        });
      });
    });
  });
  
  return flatData;
};

export const mockSalesData = salesData;
export const mockCategoryData = generateCategoryData();

// Helper function to get data by year
export const getSalesByYear = (year: number): MonthlySales[] => {
  const yearData = salesData.find(d => d.year === year);
  return yearData ? yearData.data : [];
};

// Helper function to get all years
export const getAvailableYears = (): number[] => {
  return salesData.map(d => d.year);
};
