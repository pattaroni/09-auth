import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./createNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Create a new note in NoteHub — your personal space to write down ideas, tasks, and thoughts. Stay organized and productive with ease.",
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Easily create and save new notes in NoteHub. Keep your thoughts and tasks organized in one simple place.",
    url: "https://pattaroni-08-zustand.vercel.app/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note | NoteHub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Note | NoteHub",
    description:
      "Quickly create a new note in NoteHub — the easiest way to organize your thoughts and tasks.",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
