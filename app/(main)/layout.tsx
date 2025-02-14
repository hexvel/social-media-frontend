import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex min-h-screen flex-col'>
      <Header />
      <div className='mx-auto flex min-h-screen w-full max-w-7xl gap-5 p-2'>
        <Sidebar className='sticky top-4 hidden space-y-3 rounded-lg shadow-sm sm:block px-3 py-5' />
        <div className='w-full'>{children}</div>
      </div>
      <Footer />
      <Sidebar className='sticky bottom-0 flex w-full justify-center gap-5 sm:hidden' />
    </div>
  );
}
