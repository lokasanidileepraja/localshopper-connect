import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AlertFormProps {
  targetPrice: string;
  onTargetPriceChange: (value: string) => void;
  onSetAlert: () => void;
  currentPrice: number;
}

export const AlertForm = ({ targetPrice, onTargetPriceChange, onSetAlert, currentPrice }: AlertFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice || Number(targetPrice) >= currentPrice) {
      toast({
        title: "Invalid Price",
        description: "Please enter a target price lower than the current price",
        variant: "destructive",
      });
      return;
    }
    onSetAlert();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="number"
          value={targetPrice}
          onChange={(e) => onTargetPriceChange(e.target.value)}
          placeholder="Enter target price"
          className="flex-1"
        />
        <Button type="submit">
          Set Alert
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        We'll notify you when the price drops below your target price
      </p>
    </form>
  );
};