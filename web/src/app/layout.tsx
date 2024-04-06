import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "+Sua Vida",
  description: "Gerenciamento de consultas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={`${manrope.variable} font-sans`}>{children}</body>
      </NextAuthSessionProvider>
    </html>
  );
}
