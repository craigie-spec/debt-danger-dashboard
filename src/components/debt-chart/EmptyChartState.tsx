
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmptyChartState = () => {
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
};

export default EmptyChartState;
