import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface LoadingButtonProps {
  variant?: "default" | "destructive" | "outline";
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
  onClick?: () => void;
}

export default function LoadingButton({
  variant = "default",
  children,
  isLoading,
  className,
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      disabled={isLoading}
      className={cn("flex items-center gap-2", className)}
      onClick={onClick}
    >
      {isLoading && <Loader2 className='size-4 animate-spin' />}

      {children}
    </Button>
  );
}
