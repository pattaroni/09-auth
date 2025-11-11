import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: `NoteHub`,
  description:
    "NoteHub is a simple and efficient app for managing personal notes and keeping your thoughts organized in one place.",
  openGraph: {
    title: `NoteHub`,
    description: `NoteHub is a simple and efficient app for managing personal notes and keeping your thoughts organized in one place.`,
    url: `https://pattaroni-08-zustand.vercel.app`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `NoteHub`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `NoteHub`,
    description:
      "NoteHub is a simple and efficient app for managing personal notes and keeping your thoughts organized in one place.",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

export default RootLayout;
