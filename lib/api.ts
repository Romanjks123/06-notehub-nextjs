import axios from "axios";
import type { Note, NoteTag } from '@/types/note';

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  page: number,
  query?: string,
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      perPage: 12,
      search: query?.trim() || undefined,
    },
  });
  return data;
}

export async function createNote(newNoteData: CreateNoteParams): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", newNoteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}