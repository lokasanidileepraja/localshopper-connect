
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  secondaryActionText,
  secondaryActionHref
}: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 px-6 bg-secondary/30 rounded-xl">
      <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      {actionText && actionHref && (
        <Button 
          onClick={() => navigate(actionHref)}
          className="rounded-full"
        >
          {actionText}
        </Button>
      )}
      
      {secondaryActionText && secondaryActionHref && (
        <Button 
          variant="outline"
          onClick={() => navigate(secondaryActionHref)}
          className="rounded-full ml-4"
        >
          {secondaryActionText}
        </Button>
      )}
    </div>
  );
};
