"use client";

import { useState, useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import type { PostNote } from "../../types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<PostNote>({
    title: "",
    content: "",
    tag: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (note: PostNote) => createNote(note),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      ...draft,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name: string, value: string) => {
    if (name === "title") {
      if (!value.trim()) return "Title is required";
      if (value.trim().length < 3) return "Title must be at least 3 characters";
      if (value.trim().length > 50)
        return "Title must be less than 50 characters";
    }
    if (name === "content") {
      if (value.trim().length > 500)
        return "Content must be less than 500 characters";
    }
    if (name === "tag") {
      if (!value) return "Please choose a tag";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      title: validateField("title", draft.title),
      content: validateField("content", draft.content),
      tag: validateField("tag", draft.tag),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    mutate(draft);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.field}
          value={draft.title || ""}
          onChange={handleChange}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content || ""}
          onChange={handleChange}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag || ""}
          onChange={handleChange}
        >
          <option value="">-- Choose a tag --</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
