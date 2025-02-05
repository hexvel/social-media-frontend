import Header from "@/components/Header";
import SidebarNavItems from "@/components/SidebarNavItems";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex min-h-screen flex-col'>
      <Header />
      <div className='mx-auto flex w-full max-w-7xl gap-5 p-5'>
        <div className='sticky top-4 hidden space-y-3 rounded-lg px-3 py-5 shadow-sm sm:block'>
          <SidebarNavItems className='sticky top-4 hidden space-y-3 rounded-lg px-3 py-5 shadow-sm sm:block' />
        </div>
        {children}
      </div>
      <SidebarNavItems className='sticky bottom-0 flex w-full justify-center gap-5 sm:hidden' />
    </div>
  );
}
