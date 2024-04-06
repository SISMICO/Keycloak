import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
