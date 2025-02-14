"use client";

import { cn } from "@/lib/utils";
import SidebarNavItems from "./SidebarNavItems";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={cn(className, "py-0")}>
      <SidebarNavItems className={className} />
    </div>
  );
}
