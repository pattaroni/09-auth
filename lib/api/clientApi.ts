import { Note, PostNote } from "@/types/note";
import { ApiNotesResponse, nextServer } from "./api";
import { User } from "@/types/user";

export interface AuthBody {
  email: string;
  password: string;
}

export interface EditUserBody {
  email: string;
  username: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<ApiNotesResponse> {
  const { data } = await nextServer.get<ApiNotesResponse>("/notes", {
    params: {
      ...(!!search && { search }),
      page: page,
      perPage: 12,
      ...(!!tag && { tag }),
    },
  });
  return data;
}

export async function fetchSingleNote(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: PostNote): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
}

export async function register(authBody: AuthBody): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", authBody);
  return data;
}

export async function login(authBody: AuthBody): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", authBody);
  return data;
}

export async function checkSession(): Promise<boolean> {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function updateMe(user: EditUserBody): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", user);
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}
