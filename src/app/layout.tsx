import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Verify from "@/components/Verify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PDZ+",
  description: "O site de midias oficial do PDZ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <body className={inter.className}>

        <main>
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );

}
