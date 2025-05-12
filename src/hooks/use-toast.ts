
// Use toast implementation
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@radix-ui/react-toast";
import { useState, useEffect, createContext, useContext } from "react";

type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
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
const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toasts, addToast, updateToast, dismissToast, removeToast } = context;

  return {
    toasts,
    toast: (props: ToastProps & { id?: string }) => {
      const id = props.id || String(Math.random());

      addToast({
        ...props,
        id,
      });

      return {
        id,
        dismiss: () => dismissToast(id),
        update: (props: ToastProps) =>
          updateToast(id, { ...props }),
      };
    },
    dismiss: (id: string) => dismissToast(id),
    update: (id: string, props: ToastProps) => updateToast(id, { ...props }),
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

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

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

// Legacy compatibility function
export const toast = ({ ...props }: ToastProps) => {
  console.warn(
    "Direct toast call is deprecated. Use useToast hook instead."
  );
};
