
import React, { useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DebtScenario } from "@/utils/debtCalculations";
import { useIsMobile } from "@/hooks/use-mobile";

interface DebtComparisonChartProps {
  scenarios: DebtScenario[];
}

interface ChartData {
  month: number;
  [key: string]: number;
}

const DebtComparisonChart: React.FC<DebtComparisonChartProps> = ({ scenarios }) => {
  const isMobile = useIsMobile();
  
  const chartData = useMemo(() => {
    if (!scenarios || scenarios.length === 0) return [];
    
    // Find the scenario with the most months
    const maxMonths = Math.max(...scenarios.map(s => s.paymentPlan.length));
    
    // Create data for each month
    const data: ChartData[] = [];
    for (let month = 0; month <= maxMonths; month++) {
      const monthData: ChartData = { month };
      
      // Add balance for each scenario
      scenarios.forEach(scenario => {
        if (month === 0) {
          // Initial balance (month 0)
          monthData[scenario.name] = scenario.paymentPlan[0]?.startingBalance || 0;
        } else if (month <= scenario.paymentPlan.length) {
          // Use ending balance from the previous month
          monthData[scenario.name] = scenario.paymentPlan[month - 1]?.endingBalance || 0;
        } else {
          // If this scenario is already paid off, show 0 balance
          monthData[scenario.name] = 0;
        }
      });
      
      data.push(monthData);
    }
    
    return data;
  }, [scenarios]);

  if (!scenarios || scenarios.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Debt Repayment Comparison</CardTitle>
          <CardDescription>Enter your debt details to see a comparison chart</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">No data to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Debt Repayment Comparison</CardTitle>
        <CardDescription>
          Visual comparison of your repayment scenarios over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: isMobile ? 0 : 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                label={{ 
                  value: 'Months', 
                  position: 'insideBottomRight', 
                  offset: -10 
                }} 
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                label={{
                  value: 'Balance',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' },
                  offset: isMobile ? 0 : -5
                }}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Balance']}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              
              {scenarios.map(scenario => (
                <Line
                  key={scenario.name}
                  type="monotone"
                  dataKey={scenario.name}
                  stroke={scenario.color}
                  dot={false}
                  activeDot={{ r: 8 }}
                  name={scenario.name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebtComparisonChart;
