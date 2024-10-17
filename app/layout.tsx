import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const font = Tajawal({
  subsets: ["arabic"],
  weight: ["500", "700", "800", "900"],
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
        <body className={`${font.className} px-16`}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
