import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/api/api";
import { fetchServerNotes } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category =
    slug[0] === "all" ? "" : slug[0].charAt(0).toUpperCase() + slug[0].slice(1);

  const validCategories = [
    "",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Todo",
  ];
  if (!validCategories.includes(category)) {
    notFound();
  }

  return {
    title: `Notes: ${slug[0] === "all" ? "All" : slug[0]}`,
    description: `Notes from the "${slug[0] === "all" ? "All" : slug[0]}" category.`,
    openGraph: {
      title: `Notes: ${slug[0] === "all" ? "All" : slug[0]}`,
      description: `Browse all your notes under the "${slug[0] === "all" ? "All" : slug[0]}" category and keep your ideas organized.`,
      url: `${BASE_URL}/${slug[0]}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes: ${slug[0] === "all" ? "All" : slug[0]}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes: ${slug[0] === "all" ? "All" : slug[0]}`,
      description: `Notes from the "${slug[0] === "all" ? "All" : slug[0]}" category.`,
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category =
    slug[0] === "all" ? "" : slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
  const page = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", page, category],
    queryFn: () => fetchServerNotes("", page, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={category} />
    </HydrationBoundary>
  );
}

export default NotesByCategory;
