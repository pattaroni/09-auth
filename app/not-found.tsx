import css from "./Home.module.css";
import { Metadata } from "next";
import NotFoundClient from "./NotFound.client";

export const metadata: Metadata = {
  title: `Not Found`,
  description:
    "The page you're looking for doesn't exist or may have been moved. Return to NoteHub and continue organizing your notes easily.",
  openGraph: {
    title: `Not Found | NoteHub`,
    description:
      "The page you're looking for doesn't exist or may have been moved. Return to NoteHub and continue organizing your notes easily.",
    url: `https://pattaroni-08-zustand.vercel.app`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `Not Found | NoteHub`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Not Found | NoteHub`,
    description:
      "The page you're looking for doesn't exist or may have been moved. Return to NoteHub and continue organizing your notes easily.",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

function NotFound() {
  return (
    <>
      <main>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
        <NotFoundClient />
      </main>
    </>
  );
}

export default NotFound;
