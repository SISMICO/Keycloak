'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children?: React.ReactNode;
  session?: AppProps;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
