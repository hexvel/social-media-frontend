import { ReduxProvider } from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const robotoMono = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin", "cyrillic-ext", "cyrillic", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "HEXBOOK | %s",
    default: "HEXBOOK",
  },

  icons: {
    icon: "/logo.png",
  },
  description: "Social Network",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoMono.className} antialiased bg-dark text-white flex flex-col min-h-screen items-center`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AuthProvider>
            {children}
            <Toaster
              position='top-center'
              reverseOrder={false}
              toastOptions={{
                style: {
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                },
                duration: 1500,
              }}
            />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
