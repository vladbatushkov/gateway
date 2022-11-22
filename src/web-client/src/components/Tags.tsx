import React, { Key, useEffect, useState } from 'react';
import { useGetTagsQuery, useTagAddedSubscription } from '../graphql/generated/schema';

type Tag = {
  id: Key,
  name: String
}

export const Tags: React.FC = () => {

  const sub = useTagAddedSubscription();
  const dataSub = sub.data;

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!tags || !dataSub?.tagAdded) return;
    setTags([...tags, dataSub?.tagAdded as Tag]);
  }, [dataSub]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data?.tags as Tag[]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <h2>Tags:</h2>
    <ul>
      {tags?.map((item: Tag) => (
        item ? <li key={item.id}>{item.name}</li> : null
      ))}
    </ul>
  </div>);
};