
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";

interface InterestRateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const InterestRateInput = ({ value, onChange }: InterestRateInputProps) => {
  return (
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-9"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Percent className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default InterestRateInput;
