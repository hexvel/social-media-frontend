import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <div className='w-full flex min-h-screen flex-col'>{children}</div>;
}
