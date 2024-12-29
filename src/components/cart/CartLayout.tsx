import { ReactNode } from "react";

interface CartLayoutProps {
  children: ReactNode;
}

export const CartLayout = ({ children }: CartLayoutProps) => {
  return (
    <div className="container py-8">
      {children}
    </div>
  );
};