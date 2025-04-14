
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DebtInput } from "@/utils/debtCalculations";
import { DollarSign, Percent } from "lucide-react";

interface DebtInputFormProps {
  onCalculate: (input: DebtInput) => void;
}

const DebtInputForm: React.FC<DebtInputFormProps> = ({ onCalculate }) => {
  const { toast } = useToast();
  const [debtAmount, setDebtAmount] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("18.9");
  const [minPaymentPercent, setMinPaymentPercent] = useState<string>("2");
  const [minPaymentAmount, setMinPaymentAmount] = useState<string>("25");
  const [fixedPaymentAmount, setFixedPaymentAmount] = useState<string>("200");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const input: DebtInput = {
        debtAmount: parseFloat(debtAmount),
        interestRate: parseFloat(interestRate),
        minPaymentPercent: parseFloat(minPaymentPercent),
        minPaymentAmount: parseFloat(minPaymentAmount),
        fixedPaymentAmount: parseFloat(fixedPaymentAmount),
      };
      
      // Validate inputs
      if (isNaN(input.debtAmount) || input.debtAmount <= 0) {
        throw new Error("Please enter a valid debt amount greater than 0");
      }
      if (isNaN(input.interestRate) || input.interestRate < 0) {
        throw new Error("Please enter a valid interest rate (0 or greater)");
      }
      if (isNaN(input.minPaymentPercent) || input.minPaymentPercent <= 0) {
        throw new Error("Please enter a valid minimum payment percentage greater than 0");
      }
      if (isNaN(input.minPaymentAmount) || input.minPaymentAmount <= 0) {
        throw new Error("Please enter a valid minimum payment amount greater than 0");
      }
      if (isNaN(input.fixedPaymentAmount) || input.fixedPaymentAmount <= 0) {
        throw new Error("Please enter a valid fixed payment amount greater than 0");
      }
      
      // Calculate first minimum payment for validation
      const firstMinPayment = Math.max(
        input.debtAmount * (input.minPaymentPercent / 100),
        input.minPaymentAmount
      );
      
      if (input.fixedPaymentAmount < firstMinPayment) {
        throw new Error(`Fixed payment must be at least ${firstMinPayment.toFixed(2)} (the first minimum payment)`);
      }
      
      onCalculate(input);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Input Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Debt Repayment Calculator</CardTitle>
        <CardDescription>
          Do you know how dangerous credit card minimum repayments are?
        </CardDescription>
        <p className="text-sm text-muted-foreground mt-2">
          Luckily, there is a trick. All you have to do is work out your first monthly payment. 
          Then set your direct debit or standing order to this fixed amount. 
          Compare Scenario One (Red) to Scenario Two (Yellow) after putting in your credit card details 
          and clicking Calculate Repayment Plan to see how much you can save! 
          This won't cost you anymore out of your budget than it did the first month!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="debtAmount" className="input-label">
              Current Debt Amount
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="debtAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="5000.00"
                value={debtAmount}
                onChange={(e) => setDebtAmount(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="interestRate" className="input-label">
              Annual Interest Rate (%)
            </Label>
            <div className="relative">
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                min="0"
                placeholder="18.9"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="pr-9"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Percent className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minPaymentPercent" className="input-label">
                Minimum Payment Percentage (%)
              </Label>
              <div className="relative">
                <Input
                  id="minPaymentPercent"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="2"
                  value={minPaymentPercent}
                  onChange={(e) => setMinPaymentPercent(e.target.value)}
                  className="pr-9"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="minPaymentAmount" className="input-label">
                Minimum Payment Amount
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="minPaymentAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="25.00"
                  value={minPaymentAmount}
                  onChange={(e) => setMinPaymentAmount(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="fixedPaymentAmount" className="input-label">
              Fixed Payment Amount
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="fixedPaymentAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="200.00"
                value={fixedPaymentAmount}
                onChange={(e) => setFixedPaymentAmount(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Calculate Repayment Plans
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DebtInputForm;

