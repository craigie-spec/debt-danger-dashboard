
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface FixedPaymentInputProps {
  value: string;
  onChange: (value: string) => void;
}

const FixedPaymentInput = ({ value, onChange }: FixedPaymentInputProps) => {
  return (
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default FixedPaymentInput;
