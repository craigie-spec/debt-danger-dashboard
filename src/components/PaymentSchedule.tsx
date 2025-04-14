
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DebtScenario, PaymentPlan, formatCurrency } from "@/utils/debtCalculations";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaymentScheduleProps {
  scenarios: DebtScenario[];
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ scenarios }) => {
  const [activeTab, setActiveTab] = useState("0"); // Default to first scenario (minimum payments)
  const isMobile = useIsMobile();
  
  if (!scenarios || scenarios.length === 0) {
    return (
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>
            Monthly breakdown of your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-muted-foreground">
            Enter your debt details to see payment schedules
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Payment Schedule</CardTitle>
        <CardDescription>
          Monthly breakdown of your payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="0" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            {scenarios.map((scenario, index) => (
              <TabsTrigger 
                key={index} 
                value={index.toString()}
                className="flex-1"
                style={{ borderBottom: `3px solid ${activeTab === index.toString() ? scenario.color : 'transparent'}` }}
              >
                {scenario.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {scenarios.map((scenario, index) => (
            <TabsContent key={index} value={index.toString()} className="relative">
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-[80px]">Month</TableHead>
                      <TableHead>Starting Balance</TableHead>
                      {!isMobile && <TableHead>Payment</TableHead>}
                      {!isMobile && <TableHead>Interest</TableHead>}
                      {!isMobile && <TableHead>Principal</TableHead>}
                      <TableHead>Ending Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scenario.paymentPlan.map((month) => (
                      <TableRow key={month.monthNumber}>
                        <TableCell className="font-medium">{month.monthNumber}</TableCell>
                        <TableCell>{formatCurrency(month.startingBalance)}</TableCell>
                        {!isMobile && <TableCell>{formatCurrency(month.payment)}</TableCell>}
                        {!isMobile && <TableCell>{formatCurrency(month.interest)}</TableCell>}
                        {!isMobile && <TableCell>{formatCurrency(month.principal)}</TableCell>}
                        <TableCell>{formatCurrency(month.endingBalance)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {isMobile && (
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Swipe table horizontally to see more details on mobile</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentSchedule;
