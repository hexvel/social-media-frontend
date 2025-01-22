import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl gap-5 p-5">
        <Sidebar className="z-[55555] sticky top-[5.25rem] hidden space-y-3 rounded-lg px-3 py-5 shadow-sm sm:block" />
        {children}
      </div>
      <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 sm:hidden" />
    </div>
  );
}
