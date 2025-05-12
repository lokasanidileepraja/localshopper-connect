
// Use toast implementation
import * as React from "react";
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";

// Define proper types for our toast system
type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  variant?: "default" | "destructive";
  duration?: number; // Add duration property
};

const TOAST_LIMIT = 20;
const TOAST_REMOVE_DELAY = 1000000;

export type ToastContextType = {
  toasts: ToasterToast[];
  addToast: (toast: ToasterToast) => void;
  updateToast: (id: string, toast: Partial<ToasterToast>) => void;
  dismissToast: (id: string) => void;
  removeToast: (id: string) => void;
};

// Create a context to handle toasts
const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toasts, addToast, updateToast, dismissToast, removeToast } = context;

  return {
    toasts,
    toast: (props: Omit<ToasterToast, "id"> & { id?: string }) => {
      const id = props.id || String(Math.random());

      addToast({
        ...props,
        id,
      });

      return {
        id,
        dismiss: () => dismissToast(id),
        update: (props: Partial<ToasterToast>) =>
          updateToast(id, { ...props }),
      };
    },
    dismiss: (id: string) => dismissToast(id),
    update: (id: string, props: Partial<ToasterToast>) => updateToast(id, { ...props }),
  };
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  const addToast = (toast: ToasterToast) => {
    setToasts((prevToasts) => {
      const newToasts = [...prevToasts];

      if (newToasts.length >= TOAST_LIMIT) {
        newToasts.shift();
      }

      return [...newToasts, toast];
    });
  };

  const updateToast = (id: string, toast: Partial<ToasterToast>) => {
    setToasts((prevToasts) =>
      prevToasts.map((prevToast) =>
        prevToast.id === id ? { ...prevToast, ...toast } : prevToast
      )
    );
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Create the context value object
  const contextValue: ToastContextType = {
    toasts,
    addToast,
    updateToast,
    dismissToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

// Legacy compatibility function
export const toast = (props: Omit<ToasterToast, "id">) => {
  console.warn(
    "Direct toast call is deprecated. Use useToast hook instead."
  );
};
