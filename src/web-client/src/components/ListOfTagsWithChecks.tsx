import React, { FC, useEffect, useState } from 'react';
import { Tag } from '../graphql/generated/schema';

export const ListOfTagsWithChecks: FC<{ tags: Tag[] }> = ({ tags }) => {

  const [checks, setChecks] = useState([] as { key: number, value: boolean, name: string }[]);

  useEffect(() => {
    const items = tags.map((item: Tag) => ({ key: item.id, value: false, name: item.name }));
    setChecks(items);
  }, [tags]);

  const checkHandler = (selected: { key: number, value: boolean, name: string }) => {
    const toggled = { key: selected.key, value: !selected.value, name: selected.name };
    const checksUpdated = checks
      .map((item) => item.key === toggled.key ? toggled : item);
    setChecks(checksUpdated);
    console.log(toggled);
  };

  const items = checks?.map((item) => (
    item ? <li key={item.key}>
      <input type="checkbox"
        checked={item.value}
        onChange={() => checkHandler(item)} />
      {item.name}
    </li> : null
  ));

  return (<div>
    <h2>Tags:</h2>
    <ul>
      {items}
    </ul>
  </div>);
};