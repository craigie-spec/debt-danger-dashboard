
import { CardDescription, CardTitle } from "@/components/ui/card";

const DebtFormDescription = () => {
  return (
    <div className="text-center">
      <CardTitle className="mb-4">Debt Repayment Calculator</CardTitle>
      <h2 className="text-lg font-semibold text-muted-foreground mb-4">
        Do you know how dangerous credit card minimum repayments are?
      </h2>
      <CardDescription className="text-center">
        Luckily, there is a trick. All you have to do is work out your first monthly payment. 
        Then set your direct debit or standing order to this fixed amount. 
        Compare Scenario One (Red) to Scenario Two (Yellow) after putting in your credit card details 
        and clicking Calculate Repayment Plan to see how much you can save! 
        This won't cost you anymore out of your budget than it did the first month!
      </CardDescription>
    </div>
  );
};

export default DebtFormDescription;
