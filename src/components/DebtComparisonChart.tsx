
import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DebtScenario } from "@/utils/debtCalculations";
import DebtChartContent from "./debt-chart/DebtChartContent";
import EmptyChartState from "./debt-chart/EmptyChartState";

interface DebtComparisonChartProps {
  scenarios: DebtScenario[];
}

interface ChartData {
  month: number;
  [key: string]: number;
}

const DebtComparisonChart: React.FC<DebtComparisonChartProps> = ({ scenarios }) => {
  const chartData = useMemo(() => {
    if (!scenarios || scenarios.length === 0) return [];
    
    const maxMonths = Math.max(...scenarios.map(s => s.paymentPlan.length));
    const data: ChartData[] = [];
    
    for (let month = 0; month <= maxMonths; month++) {
      const monthData: ChartData = { month };
      
      scenarios.forEach(scenario => {
        monthData[scenario.name] = month === 0
          ? scenario.paymentPlan[0]?.startingBalance || 0
          : month <= scenario.paymentPlan.length
            ? scenario.paymentPlan[month - 1]?.endingBalance || 0
            : 0;
      });
      
      data.push(monthData);
    }
    
    return data;
  }, [scenarios]);

  if (!scenarios || scenarios.length === 0) {
    return <EmptyChartState />;
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
        <DebtChartContent data={chartData} scenarios={scenarios} />
      </CardContent>
    </Card>
  );
};

export default DebtComparisonChart;
