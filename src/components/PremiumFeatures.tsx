
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PremiumFeaturesProps {
  isPremium: boolean;
  onPurchasePremium: () => void;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({
  isPremium,
  onPurchasePremium,
}) => {
  const { toast } = useToast();

  const handlePurchase = () => {
    // In a real app, this would connect to payment processing
    onPurchasePremium();
    toast({
      title: "Premium Activated",
      description: "Thank you for your purchase! Ads have been removed.",
    });
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Debt Danger Dashboard</CardTitle>
          {isPremium ? (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Premium
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted/50">
              Free
            </Badge>
          )}
        </div>
        <CardDescription>
          Visualize and understand your credit card debt repayment options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Free Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Calculate three debt repayment scenarios</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Compare repayment timelines visually</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>View month-by-month payment schedules</span>
              </li>
              <li className="flex items-start">
                <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-muted-foreground">Includes ads</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Premium Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>All free features included</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Ad-free experience</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>Support future development</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span>One-time payment, no subscriptions</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        {!isPremium && (
          <Button onClick={handlePurchase} className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade to Premium ($4.99)
          </Button>
        )}
        {isPremium && (
          <p className="text-sm text-muted-foreground">
            Thank you for supporting Debt Danger Dashboard!
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PremiumFeatures;
