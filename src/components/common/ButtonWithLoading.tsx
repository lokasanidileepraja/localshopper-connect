
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { memo } from "react";

interface ButtonWithLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

const ButtonWithLoading = memo(({
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  variant = "default",
  size = "default",
  onClick,
  ...props
}: ButtonWithLoadingProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || disabled}
      onClick={loading ? undefined : onClick}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading && loadingText ? loadingText : children}
    </Button>
  );
});

ButtonWithLoading.displayName = "ButtonWithLoading";

export { ButtonWithLoading };
