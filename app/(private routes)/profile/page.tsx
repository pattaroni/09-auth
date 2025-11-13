import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/api/api";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description:
    "View and manage your personal profile information, update your username and avatar, or access your account settings on NoteHub.",
  openGraph: {
    title: "Profile | NoteHub",
    description:
      "Manage your personal profile, edit your details, and keep your NoteHub account up to date.",
    url: `${BASE_URL}/profile`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Page",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile | NoteHub",
    description:
      "Manage your personal information and account details on NoteHub.",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

async function ProfilePage() {
  const user = await getServerMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
