
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Percent } from "lucide-react";

interface MinimumPaymentInputsProps {
  percentValue: string;
  amountValue: string;
  onPercentChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

const MinimumPaymentInputs = ({
  percentValue,
  amountValue,
  onPercentChange,
  onAmountChange,
}: MinimumPaymentInputsProps) => {
  return (
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
            value={percentValue}
            onChange={(e) => onPercentChange(e.target.value)}
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
            value={amountValue}
            onChange={(e) => onAmountChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
};

export default MinimumPaymentInputs;
