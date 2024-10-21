import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";

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
        <body className={`${FONT.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="#F26969" />

            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
