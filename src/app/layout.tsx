import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";
import Grid from "../components/grid";
import Header from "../components/ui/header";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

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
  description:
    "A Digital Product Design Studio building quality applications, websites, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.hanaoka.co",
    title: "Hanaoka Design Studio",
    description:
      "A Digital Product Design Studio building quality applications, websites, and more.",
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
        <Footer className="col-span-full" />
        <Grid className="h-screen w-screen" />
        <Toaster
          position="bottom-center"
          toastOptions={{
            // unstyled: true,
            classNames: {
              actionButton: '!font-mono !rounded-full !bg-green-600 !text-green-100',
              toast: 'rounded-none bg-merino-50/50 backdrop-blur-md border-neutral-200 sm:border-merino-200/20',
              success: 'text-merino-300',
              content: '!font-mono text-neutral-950',
              // title: "text-neutral-800",
              // content: "text-sm sm:text-base",
              // description: "text-xs sm:text-sm text-neutral-500",
              // actionButton:
              //   "!py-1 !h-auto !px-4 text-nowrap text-sm sm:!text-base !text-green-100 !bg-green-500  !rounded-full",
              // success: "text-green-500",
              // toast:
              //   "border-none flex gap-4 items-center !px-7 !py-4 !h-auto sm:translate-x-[-47px] sm:w-[450px] bg-merino-50/50 backdrop-blur-md rounded-full shadow-lg",
            },
          }}
        />
      </body>
    </html>
  );
}
