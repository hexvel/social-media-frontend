import { ReduxProvider } from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TOASTER_CONSTANT } from "@/constants/toaster.contant";
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
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster {...TOASTER_CONSTANT} />
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
