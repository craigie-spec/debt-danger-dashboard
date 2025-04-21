
import React, { useState } from "react";
import { DebtInput } from "@/utils/debtCalculations";
import { YStack, XStack, Button, Input, Text, H2, Paragraph } from "tamagui";

interface DebtInputFormProps {
  onCalculate: (input: DebtInput) => void;
}

const DebtInputForm: React.FC<DebtInputFormProps> = ({ onCalculate }) => {
  const [debtAmount, setDebtAmount] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("18.9");
  const [minPaymentPercent, setMinPaymentPercent] = useState<string>("2");
  const [minPaymentAmount, setMinPaymentAmount] = useState<string>("25");
  const [fixedPaymentAmount, setFixedPaymentAmount] = useState<string>("200");
  const [error, setError] = useState<string | null>(null);

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

      const firstMinPayment = Math.max(
        input.debtAmount * (input.minPaymentPercent / 100),
        input.minPaymentAmount
      );

      if (input.fixedPaymentAmount < firstMinPayment) {
        throw new Error(`Fixed payment must be at least ${firstMinPayment.toFixed(2)} (the first minimum payment)`);
      }

      setError(null);
      onCalculate(input);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <YStack space="$4" p="$4" borderWidth={1} borderColor="$border" bc="$background" br="$4" my="$4">
      <H2>Debt Details</H2>
      <Paragraph>Enter your credit card debt info. Tap "Calculate" below to compare payment strategies.</Paragraph>
      <form onSubmit={handleSubmit}>
        <YStack space="$3">
          <XStack ai="center" jc="space-between">
            <Text size="$4">Current Debt Amount</Text>
            <Input
              keyboardType="decimal-pad"
              value={debtAmount}
              onChangeText={setDebtAmount}
              placeholder="5000.00"
              width={150}
            />
          </XStack>
          <XStack ai="center" jc="space-between">
            <Text size="$4">Annual Interest Rate (%)</Text>
            <Input
              keyboardType="decimal-pad"
              value={interestRate}
              onChangeText={setInterestRate}
              placeholder="18.9"
              width={150}
            />
          </XStack>
          <XStack ai="center" jc="space-between">
            <Text size="$4">Minimum Payment Percentage (%)</Text>
            <Input
              keyboardType="decimal-pad"
              value={minPaymentPercent}
              onChangeText={setMinPaymentPercent}
              placeholder="2"
              width={150}
            />
          </XStack>
          <XStack ai="center" jc="space-between">
            <Text size="$4">Minimum Payment Amount</Text>
            <Input
              keyboardType="decimal-pad"
              value={minPaymentAmount}
              onChangeText={setMinPaymentAmount}
              placeholder="25.00"
              width={150}
            />
          </XStack>
          <XStack ai="center" jc="space-between">
            <Text size="$4">Fixed Payment Amount</Text>
            <Input
              keyboardType="decimal-pad"
              value={fixedPaymentAmount}
              onChangeText={setFixedPaymentAmount}
              placeholder="200.00"
              width={150}
            />
          </XStack>
          {error && (
            <Text color="red" size="$2">{error}</Text>
          )}
          <Button theme="active" size="$5" type="submit" width="100%">
            Calculate Repayment Plans
          </Button>
        </YStack>
      </form>
    </YStack>
  );
};

export default DebtInputForm;
