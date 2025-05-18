
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";
import { ButtonWithLoading } from "./ButtonWithLoading";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  hideCloseButton?: boolean;
  disableAutoFocus?: boolean;
  showConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  isConfirmLoading?: boolean;
  isConfirmDisabled?: boolean;
  confirmButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  hideCloseButton = false,
  disableAutoFocus = false,
  showConfirm = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isConfirmLoading = false,
  isConfirmDisabled = false,
  confirmButtonVariant = "default"
}: ModalProps) {
  // Handle escape key
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);

  // Calculate content class based on size
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "max-w-sm";
      case "md": return "max-w-md";
      case "lg": return "max-w-lg"; 
      case "xl": return "max-w-xl";
      case "full": return "max-w-[95vw] w-[95vw] h-[90vh]";
      default: return "max-w-md";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent 
        className={`${getSizeClass()} ${size === 'full' ? 'flex flex-col' : ''}`}
        onOpenAutoFocus={(e) => disableAutoFocus && e.preventDefault()}
      >
        {!hideCloseButton && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        <div className={size === 'full' ? 'flex-grow overflow-auto' : ''}>
          {children}
        </div>
        
        {(footer || showConfirm) && (
          <DialogFooter>
            {footer || (
              <>
                <Button variant="outline" onClick={onClose}>
                  {cancelText}
                </Button>
                <ButtonWithLoading
                  variant={confirmButtonVariant}
                  loading={isConfirmLoading}
                  disabled={isConfirmDisabled}
                  onClick={onConfirm}
                >
                  {confirmText}
                </ButtonWithLoading>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
