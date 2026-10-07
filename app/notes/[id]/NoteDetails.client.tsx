"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
  <div>
    {isLoading && <p>Loading, please wait...</p>}
    {(isError || (!data && isSuccess)) && <p>Something went wrong.</p>}
    {data && (
      <main className={css.main}>	
	<div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>{data.title}</h2>
		  </div>
		  <p className={css.tag}>{data.tag}</p>
                          <p className={css.content}>{data.content}</p>
                          <p className={css.date}>{data.createdAt}</p>
		</div>
	</div>
</main>

    )}
  </div>
);
}
