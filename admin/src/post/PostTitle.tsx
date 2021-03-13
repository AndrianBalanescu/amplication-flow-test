import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Post } from "../api/post/Post";

type Props = { id: string };

export const PostTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Post,
    AxiosError,
    [string, string]
  >(["get-/api/posts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/posts"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/posts"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
