import { FC } from 'react';
import { Tag } from '../graphql/generated/schema';

export const ListOfTags: FC<{ tags: Tag[] }> = ({ tags }) => {
  console.log(tags);
  const items = tags?.map((item: Tag) => (
    item ? <li key={item.id}>{item.name}</li> : null
  ));

  return (<div>
    <h2>Tags:</h2>
    <ul>
      {items}
    </ul>
  </div>);
};