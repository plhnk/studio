import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";
import Grid from "../components/grid";
import Header from "../components/ui/header";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";

const fira_code = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

const fira_sans = Fira_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-sans",
  weight: ["200", "400", "600", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hanaoka Design Studio",
  description: "A Digital Product Design Studio building quality applications, websites, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.hanaoka.co",
    title: "Hanaoka Design Studio",
    description: "A Digital Product Design Studio building quality applications, websites, and more.",
    images: [
      {
        url: "https://studio.hanaoka.co/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hanaoka Design Studio",
      },
    ],
    siteName: "Hanaoka Design Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={fira_code.className + " main-grid py-8 bg-merino-50"}>
        <Header className="fixed top-0 left-0 right-0 p-4 md:p-8 h-40 z-50 max-w-full" /> 
        {/* grid-def */}
        <Navbar className="z-50" />
        {/* grid-def */}
        <main className="col-span-full grid grid-cols-subgrid">{children}</main>
        <Footer className='col-span-full' />
        <Grid className="h-screen w-screen" />
      </body>
    </html>
  );
}
