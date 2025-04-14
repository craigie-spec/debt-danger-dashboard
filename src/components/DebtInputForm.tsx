
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DebtInput } from "@/utils/debtCalculations";
import DebtFormDescription from "./debt-input/DebtFormDescription";
import DebtAmountInput from "./debt-input/DebtAmountInput";
import InterestRateInput from "./debt-input/InterestRateInput";
import MinimumPaymentInputs from "./debt-input/MinimumPaymentInputs";
import FixedPaymentInput from "./debt-input/FixedPaymentInput";

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
        <DebtFormDescription />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DebtAmountInput 
            value={debtAmount}
            onChange={setDebtAmount}
          />
          
          <InterestRateInput
            value={interestRate}
            onChange={setInterestRate}
          />
          
          <MinimumPaymentInputs
            percentValue={minPaymentPercent}
            amountValue={minPaymentAmount}
            onPercentChange={setMinPaymentPercent}
            onAmountChange={setMinPaymentAmount}
          />
          
          <FixedPaymentInput
            value={fixedPaymentAmount}
            onChange={setFixedPaymentAmount}
          />
          
          <Button type="submit" className="w-full">
            Calculate Repayment Plans
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DebtInputForm;
