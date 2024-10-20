import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import localFont from "next/font/local";

const FONT = localFont({
  src: "./fonts/medium.otf",
});

export const metadata: Metadata = {
  title: "ادارة متجر الطاقة",
  description: "Developed by Maro Asam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <body className={`${FONT.className} px-3 lg:px-16`}>
          <NextTopLoader />

          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
