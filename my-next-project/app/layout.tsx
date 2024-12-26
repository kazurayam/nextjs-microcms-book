import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    template: "%s | シンプルなコーポレイトサイト",
    default: "シンプルなコーポレイトサイト",
  },
  description:
    "「Next.jsとヘッドレスCMSで始める！かんたん・モダンWebサイト制作入門」が作成したサイトです",
  openGraph: {
    title: "シンプルなコーポレイトサイト",
    description:
      "「Next.jsとヘッドレスCMSで始める！かんたん・モダンWebサイト制作入門」が作成したサイトです",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-RLNXXYDMJP" />
    </html>
  );
}
