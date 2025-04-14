
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DebtScenario, formatCurrency } from "@/utils/debtCalculations";

interface DebtSummaryProps {
  scenarios: DebtScenario[];
}

const DebtSummary: React.FC<DebtSummaryProps> = ({ scenarios }) => {
  if (!scenarios || scenarios.length === 0) {
    return null;
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Payment Plan Summary</CardTitle>
        <CardDescription>
          Compare how different payment strategies affect your debt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <Card key={scenario.name} className="overflow-hidden">
              <div 
                className="h-2" 
                style={{ backgroundColor: scenario.color }}
              />
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{scenario.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Time to pay off:</dt>
                    <dd className="text-sm font-semibold">
                      {scenario.months} months 
                      ({(scenario.months / 12).toFixed(1)} years)
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Total interest:</dt>
                    <dd className="text-sm font-semibold">
                      {formatCurrency(scenario.totalInterest)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">Total paid:</dt>
                    <dd className="text-sm font-semibold">
                      {formatCurrency(scenario.totalPaid)}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <p className="text-sm text-muted-foreground">
          The "Minimum Payments" scenario will take the longest but has lower monthly payments.
          The "Fixed Payment" scenario saves the most interest but requires higher monthly payments.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DebtSummary;
