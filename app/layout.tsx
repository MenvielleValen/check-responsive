import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderSearch } from "./components/organisms/HeaderSearch";
import { StoreProvider } from "./StoreProvider";
import { appMetadata } from "@/constants/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = appMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <HeaderSearch />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
