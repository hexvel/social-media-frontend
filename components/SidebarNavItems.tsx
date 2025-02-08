"use client";

import { navItems } from "@/constants/navbar.constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PagesYouLike from "./PagesYouLike";

export default function SidebarNavItems({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <div className={cn(className, "z-[5555] bg-primary-theme min-w-[260px]")}>
      {navItems.map(({ path, label, Icon }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            "p-4 rounded-md w-full flex items-center justify-center sm:justify-start gap-x-4 transition-colors text-[#6f7376]",
            pathname === path
              ? "bg-secondary-theme text-dark"
              : "hover:bg-secondary-theme hover:text-primary-theme",
          )}
        >
          <Icon size={30} />
          <span className='font-medium text-lg hidden sm:block'>{label}</span>
        </Link>
      ))}
      <div className='hidden md:block'>
        <hr className='mb-4' />
        <PagesYouLike />
      </div>
    </div>
  );
}
