import React from 'react';
import { useGetTagsQuery } from '../graphql/generated/schema';

export const Tags: React.FC = () => {
  const { loading, error, data } = useGetTagsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <h2>Tags:</h2>
    <ul>
      {data?.tags.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  </div>);
};