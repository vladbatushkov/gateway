import { useEffect, useState } from "react";
import {
  Tag,
  useGetTagsQuery,
  useTagAddedSubscription,
} from "../graphql/generated/schema";
import { ListOfTags, ListOfTagsProps } from "./ListOfTags";
import { TagInput } from "./TagInput";

export const LeftSection = () => {
  const sub = useTagAddedSubscription();
  const dataSub = sub.data;

  useEffect(() => {
    if (!dataSub?.tagAdded) return;
    setTags([...tags, dataSub.tagAdded as Tag]);
  }, [dataSub]);

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data?.tags as Tag[]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="block has-background-white">
      <div className="panel is-info">
        <p className="panel-heading">List of Tags</p>
        <TagInput />
        <ListOfTags {...({ tags } as ListOfTagsProps)} />
      </div>
    </div>
  );
};
