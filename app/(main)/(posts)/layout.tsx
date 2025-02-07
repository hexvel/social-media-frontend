import RightSidebar from "@/components/RightSidebar";
import { ReactNode } from "react";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='w-full flex min-h-screen gap-6'>
      {children}
      <RightSidebar />
    </div>
  );
}
