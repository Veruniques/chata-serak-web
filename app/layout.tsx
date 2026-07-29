import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GrantBanner from "@/components/GrantBanner";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Chata na Šeráku — ubytování a restaurace na vrcholu Jeseníků",
  description:
    "Horská chata na vrcholu Šeráku (1351 m) v Hrubém Jeseníku. Ubytování, tradiční kuchyně, horská sauna a výhledy, které si budete pamatovat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <GrantBanner />
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
