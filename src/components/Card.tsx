import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white shadow-md rounded-md overflow-hidden", className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

export { Card, CardHeader, CardContent, CardTitle };
