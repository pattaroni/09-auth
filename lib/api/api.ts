import axios, { AxiosError } from "axios";
import type { Note } from "../../types/note";

export interface ApiNotesResponse {
  notes: Note[];
  totalPages: number;
}
export type ApiError = AxiosError<{
  error?: string;
  response?: {
    message?: string;
  };
}>;

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
