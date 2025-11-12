"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import { ApiNotesResponse } from "@/lib/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";

function Notes({ tag = "" }: { tag?: string }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 300);

  const { data, isError, isLoading, isSuccess, error } =
    useQuery<ApiNotesResponse>({
      queryKey: ["notes", query, currentPage, tag],
      queryFn: () => fetchNotes(query, currentPage, tag),
      placeholderData: currentPage > 1 ? keepPreviousData : undefined,
    });
  const totalPages = data?.totalPages ?? 0;

  if (isError && error) throw error;

  return (
    <div className={css.app}>
      <section className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}

        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </section>
      {isLoading && <Loader>Loading notes, please wait...</Loader>}
      {data && data.notes.length === 0 && (
        <ErrorMessage>Not Found!</ErrorMessage>
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default Notes;
