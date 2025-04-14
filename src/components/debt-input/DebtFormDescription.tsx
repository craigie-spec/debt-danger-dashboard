
import { CardDescription, CardTitle } from "@/components/ui/card";

const DebtFormDescription = () => {
  return (
    <>
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
    </>
  );
};

export default DebtFormDescription;
