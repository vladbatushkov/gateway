import React, { useEffect, useState } from 'react';
import { Tag, useGetTagsQuery, useTagAddedSubscription } from '../graphql/generated/schema';
import { TagInput } from './TagInput';
import { ListOfTagsWithChecks } from './ListOfTagsWithChecks';
import { UserInput } from './UserInput';

export const TagsWithInputWithSubWithChecks: React.FC = () => {

  const sub = useTagAddedSubscription();
  const dataSub = sub.data;

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data.tags as Tag[]);
  }, [data]);

  useEffect(() => {
    if (!dataSub?.tagAdded) return;
    setTags([...tags, dataSub.tagAdded as Tag]);
  }, [dataSub]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <UserInput />
    <TagInput />
    <ListOfTagsWithChecks {...{ tags }} />
  </div>);
};