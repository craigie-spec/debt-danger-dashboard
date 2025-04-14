
import React, { useState } from "react";
import { DebtInput, DebtScenario, calculateDebtScenarios } from "@/utils/debtCalculations";
import DebtInputForm from "@/components/DebtInputForm";
import DebtComparisonChart from "@/components/DebtComparisonChart";
import DebtSummary from "@/components/DebtSummary";
import PaymentSchedule from "@/components/PaymentSchedule";
import PremiumFeatures from "@/components/PremiumFeatures";
import AdPlaceholder from "@/components/AdPlaceholder";
import { CreditCard } from "lucide-react";

const Index = () => {
  const [scenarios, setScenarios] = useState<DebtScenario[]>([]);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleCalculate = (input: DebtInput) => {
    try {
      const calculatedScenarios = calculateDebtScenarios(input);
      setScenarios(calculatedScenarios);
      setHasCalculated(true);
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  const handlePurchasePremium = () => {
    // In a real app, this would process payment
    setIsPremium(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Debt Danger Dashboard</h1>
          </div>
          <p className="max-w-2xl">
            Visualize how different payment strategies affect your credit card debt.
            Compare minimum payments vs. fixed payment amounts and see the true cost of credit card debt.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          <PremiumFeatures 
            isPremium={isPremium} 
            onPurchasePremium={handlePurchasePremium} 
          />
          
          {!isPremium && <AdPlaceholder className="h-16" />}
          
          <DebtInputForm onCalculate={handleCalculate} />
          
          {hasCalculated && (
            <>
              <DebtComparisonChart scenarios={scenarios} />
              
              {!isPremium && <AdPlaceholder className="h-16" />}
              
              <DebtSummary scenarios={scenarios} />
              
              <PaymentSchedule scenarios={scenarios} />
              
              {!isPremium && <AdPlaceholder className="h-16" />}
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            Debt Danger Dashboard © {new Date().getFullYear()} | <span className="font-medium">This app is for educational purposes only. Not financial advice.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
