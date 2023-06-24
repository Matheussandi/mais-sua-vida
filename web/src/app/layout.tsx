import "./globals.css";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
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
      <body className={`${manrope.variable} font-sans`}>{children}</body>
    </html>
  );
}
