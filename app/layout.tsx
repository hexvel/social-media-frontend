import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin", "cyrillic-ext", "cyrillic", "latin-ext"],
});

export const metadata: Metadata = {
  title: "HexBook",
  description: "Social Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.className} antialiased bg-dark text-white`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="mx-auto flex w-full grow gap-5 p-5">
            <Sidebar className="sticky top-[5.25rem] hidden space-y-3 rounded-lg px-3 py-5 shadow-sm sm:block" />
            {children}
          </div>
          <Sidebar className="sticky bottom-0 flex w-full justify-center gap-5 sm:hidden" />
        </div>
      </body>
    </html>
  );
}
