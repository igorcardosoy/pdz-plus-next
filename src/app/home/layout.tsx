import type { Metadata } from "next";
import Header from "../../components/Header";


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
    <div>
        <Header/>

        <main>
          {children}
        </main>
    </div>
  );
}
