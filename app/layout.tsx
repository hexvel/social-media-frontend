import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from '@/components/ReduxProvider';

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
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
