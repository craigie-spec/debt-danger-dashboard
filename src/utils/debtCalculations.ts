
interface PaymentPlan {
  monthNumber: number;
  startingBalance: number;
  payment: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

interface DebtScenario {
  name: string;
  color: string;
  paymentPlan: PaymentPlan[];
  totalPaid: number;
  totalInterest: number;
  months: number;
}

interface DebtInput {
  debtAmount: number;
  interestRate: number;
  minPaymentPercent: number;
  minPaymentAmount: number;
  fixedPaymentAmount: number;
}

/**
 * Calculate all three debt repayment scenarios
 */
export function calculateDebtScenarios(input: DebtInput): DebtScenario[] {
  // Validate inputs
  if (input.debtAmount <= 0) throw new Error("Debt amount must be greater than 0");
  if (input.interestRate < 0) throw new Error("Interest rate cannot be negative");
  if (input.minPaymentPercent <= 0) throw new Error("Minimum payment percentage must be greater than 0");
  if (input.minPaymentAmount <= 0) throw new Error("Minimum payment amount must be greater than 0");
  
  // Calculate first minimum payment for scenario 2
  const monthlyInterestRate = input.interestRate / 100 / 12;
  const firstMinPayment = Math.max(
    input.debtAmount * (input.minPaymentPercent / 100),
    input.minPaymentAmount
  );
  
  // Validate fixed payment amount
  if (input.fixedPaymentAmount < firstMinPayment) {
    throw new Error("Fixed payment amount must be greater than or equal to first minimum payment");
  }
  
  // Calculate scenarios
  const scenarios: DebtScenario[] = [
    calculateMinimumPayments(input, "Minimum Payments", "#ea384c"),
    calculateFixedPayment(input, firstMinPayment, "First Min Payment", "#FEF7CD"),
    calculateFixedPayment(input, input.fixedPaymentAmount, "Fixed Payment", "#1EAEDB")
  ];
  
  return scenarios;
}

/**
 * Calculate debt repayment with minimum payments
 */
function calculateMinimumPayments(
  input: DebtInput,
  name: string,
  color: string
): DebtScenario {
  const { debtAmount, interestRate, minPaymentPercent, minPaymentAmount } = input;
  const monthlyInterestRate = interestRate / 100 / 12;
  
  let currentBalance = debtAmount;
  const paymentPlan: PaymentPlan[] = [];
  let totalPaid = 0;
  let totalInterest = 0;
  let monthNumber = 1;
  
  // Continue until balance is effectively zero
  while (currentBalance > 0.01 && monthNumber <= 600) { // Prevent infinite loops, cap at 50 years
    const startingBalance = currentBalance;
    
    // Calculate interest for this month
    const interestThisMonth = currentBalance * monthlyInterestRate;
    
    // Calculate minimum payment based on percentage or minimum amount
    let minimumPayment = Math.max(
      currentBalance * (minPaymentPercent / 100),
      minPaymentAmount
    );
    
    // Ensure payment doesn't exceed balance plus interest
    minimumPayment = Math.min(
      minimumPayment,
      currentBalance + interestThisMonth
    );
    
    const principalPaid = minimumPayment - interestThisMonth;
    
    // Update balance
    currentBalance = currentBalance - principalPaid;
    
    // Track payment
    paymentPlan.push({
      monthNumber,
      startingBalance,
      payment: minimumPayment,
      interest: interestThisMonth,
      principal: principalPaid,
      endingBalance: currentBalance
    });
    
    totalPaid += minimumPayment;
    totalInterest += interestThisMonth;
    monthNumber++;
  }
  
  return {
    name,
    color,
    paymentPlan,
    totalPaid,
    totalInterest,
    months: paymentPlan.length
  };
}

/**
 * Calculate debt repayment with a fixed payment amount
 */
function calculateFixedPayment(
  input: DebtInput,
  fixedAmount: number,
  name: string,
  color: string
): DebtScenario {
  const { debtAmount, interestRate } = input;
  const monthlyInterestRate = interestRate / 100 / 12;
  
  let currentBalance = debtAmount;
  const paymentPlan: PaymentPlan[] = [];
  let totalPaid = 0;
  let totalInterest = 0;
  let monthNumber = 1;
  
  // Continue until balance is effectively zero
  while (currentBalance > 0.01 && monthNumber <= 600) { // Prevent infinite loops, cap at 50 years
    const startingBalance = currentBalance;
    
    // Calculate interest for this month
    const interestThisMonth = currentBalance * monthlyInterestRate;
    
    // Calculate payment (fixed amount or remaining balance with interest)
    const payment = Math.min(
      fixedAmount,
      currentBalance + interestThisMonth
    );
    
    const principalPaid = payment - interestThisMonth;
    
    // Update balance
    currentBalance = currentBalance - principalPaid;
    
    // Track payment
    paymentPlan.push({
      monthNumber,
      startingBalance,
      payment,
      interest: interestThisMonth,
      principal: principalPaid,
      endingBalance: currentBalance
    });
    
    totalPaid += payment;
    totalInterest += interestThisMonth;
    monthNumber++;
  }
  
  return {
    name,
    color,
    paymentPlan,
    totalPaid,
    totalInterest,
    months: paymentPlan.length
  };
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export type { DebtScenario, PaymentPlan, DebtInput };
