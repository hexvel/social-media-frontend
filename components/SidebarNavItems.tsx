"use client";

import { navItems } from "@/constants/navbar.constant";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import PagesYouLike from "./PagesYouLike";

export default function SidebarNavItems({ className }: { className: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn(className, "px-4 bg-primary-theme")}>
      {navItems.map(({ path, label, Icon }) => (
        <button
          key={path}
          onClick={() => router.push(path)}
          className={cn(
            "py-2 px-4 rounded-md w-full flex items-center justify-center sm:justify-start p-3 gap-x-4 transition-colors text-[#6f7376]",
            pathname === path
              ? "bg-secondary-theme text-dark"
              : "hover:bg-secondary-theme hover:text-primary-theme"
          )}
        >
          <Icon size={30} />
          <span className="font-medium text-lg hidden sm:block">{label}</span>
        </button>
      ))}
      <div className="hidden md:block">
        <hr className="mb-4" />
        <PagesYouLike />
      </div>
    </div>
  );
}
