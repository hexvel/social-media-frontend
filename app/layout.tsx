import { AuthCheck } from "@/components/AuthCheck";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const robotoMono = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin", "cyrillic-ext", "cyrillic", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "HexBook | %s",
    default: "HexBook",
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
        className={`${robotoMono.className} antialiased bg-dark text-white`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AuthCheck />
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
        </ReduxProvider>
      </body>
    </html>
  );
}
