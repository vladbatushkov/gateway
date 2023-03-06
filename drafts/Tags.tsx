import { FC, useEffect, useState } from "react";
import { Tag, useGetTagsQuery } from "../graphql/generated/schema";
import { ListOfTags } from "../../drafts/ListOfTags";

export const Tags: FC = () => {
  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data?.tags as Tag[]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <ListOfTags {...{ tags }} />;
};
