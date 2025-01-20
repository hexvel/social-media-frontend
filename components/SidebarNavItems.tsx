"use client";

import { navItems } from "@/constants/navbar.constant";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarNavItems() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-full bg-primary-theme p-6 rounded-md flex flex-col gap-y-5">
      {navItems.map(({ path, label, Icon }) => (
        <button
          key={path}
          onClick={() => router.push(path)}
          className={cn(
            "py-2 px-4 rounded-md flex items-center gap-x-4 transition-colors text-[#6f7376]",
            pathname === path
              ? "bg-secondary-theme text-dark"
              : "hover:bg-secondary-theme hover:text-primary-theme"
          )}
        >
          <Icon size={30} />
          <span className="font-medium text-xl">{label}</span>
        </button>
      ))}
    </div>
  );
}
