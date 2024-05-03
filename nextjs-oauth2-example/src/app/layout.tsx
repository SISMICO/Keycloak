import { Inter } from "next/font/google";
import "./globals.css";
import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <Suspense>
          {children}
        </Suspense>
      </body>
      </Providers>
    </html>
  );
}
