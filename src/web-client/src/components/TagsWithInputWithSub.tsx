import React, { useEffect, useState } from 'react';
import { Tag, useGetTagsQuery, useOnTagAddedSubscription } from '../graphql/generated/schema';
import { AddTag } from './AddTag';
import { ListOfTags } from './ListOfTags';

export const TagsWithInputWithSub: React.FC = () => {

  const sub = useOnTagAddedSubscription();
  const dataSub = sub.data;

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data.tags as Tag[]);
  }, [data]);

  useEffect(() => {
    if (!dataSub?.onTagAdded) return;
    setTags([...tags, dataSub.onTagAdded as Tag]);
  }, [dataSub]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <AddTag />
    <ListOfTags {...{ tags }} />
  </div>);
};