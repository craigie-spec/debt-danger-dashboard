
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { DebtScenario } from "@/utils/debtCalculations";
import { useIsMobile } from "@/hooks/use-mobile";

interface DebtChartContentProps {
  data: Array<{
    month: number;
    [key: string]: number;
  }>;
  scenarios: DebtScenario[];
}

const DebtChartContent = ({ data, scenarios }: DebtChartContentProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
  );
};

export default DebtChartContent;
