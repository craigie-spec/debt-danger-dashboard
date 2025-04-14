
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  className?: string;
  isPremium?: boolean;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className, isPremium = false }) => {
  if (isPremium) {
    return null;
  }

  return (
    <Card 
      className={cn(
        "mb-6 p-3 flex items-center justify-center text-sm text-muted-foreground bg-muted/30",
        className
      )}
    >
      <p className="text-center">
        Advertisement Placeholder<br />
        <span className="text-xs">(Upgrade to Premium to remove ads)</span>
      </p>
    </Card>
  );
};

export default AdPlaceholder;
