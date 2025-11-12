import axios, { AxiosError } from "axios";
import type { Note, PostNote } from "../../types/note";

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

interface apiTypes {
  BASE_URL: string;
  ENDPOINTS: {
    notes: () => string;
    delNote: (id: string) => string;
    register: () => string;
    login: () => string;
    checkSession: () => string;
    getMe: () => string;
    logout: () => string;
  };
}

const apiNoteHub: apiTypes = {
  BASE_URL: "http://localhost:3000/api",
  ENDPOINTS: {
    notes: () => `/notes`,
    delNote: (id) => `/notes/${id}`,
    register: () => `/auth/register`,
    login: () => `/auth/login`,
    checkSession: () => `/auth/session`,
    getMe: () => `/users/me`,
    logout: () => `/auth/logout`,
  },
};

export const { BASE_URL, ENDPOINTS } = apiNoteHub;

export const nextServer = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
