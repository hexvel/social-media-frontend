"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "size-4 border-2",
    md: "size-8 border-3",
    lg: "size-12 border-4",
  };

  return (
    <div
      className={cn(
        "relative animate-spin rounded-full border-t-transparent border-secondary-theme",
        sizeClasses[size],
        className,
      )}
    >
      <div
        className='absolute inset-0 rounded-full border-t-transparent border-secondary-theme/30 -rotate-90'
        style={{
          borderWidth: "inherit",
        }}
      />
    </div>
  );
}
