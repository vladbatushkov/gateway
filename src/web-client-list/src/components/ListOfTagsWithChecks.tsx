import React, { FC, useEffect, useState } from "react";
import { Tag } from "../graphql/generated/schema";

export interface ItemProps {
  name: string;
  value: boolean;
}

export interface ListOfTagsProps {
  tags: Tag[];
  onChecked: (props: ItemProps) => void;
}

export const ListOfTagsWithChecks: FC<ListOfTagsProps> = ({
  tags,
  onChecked,
}) => {
  const [checks, setChecks] = useState([] as ItemProps[]);

  useEffect(() => {
    const items = tags.map(
      (item: Tag) =>
        ({
          key: item.name,
          value: false,
          name: item.name,
        } as ItemProps)
    );
    setChecks(items);
  }, [tags]);

  const checkHandler = (selected: ItemProps) => {
    const toggled = {
      value: !selected.value,
      name: selected.name,
    } as ItemProps;
    const checksUpdated = checks.map((item) =>
      item.name === toggled.name ? toggled : item
    );
    setChecks(checksUpdated);
    onChecked(toggled);
  };

  const items = checks?.map((item) =>
    item ? (
      <label key={item.name} className="checkbox panel-block is-active">
        <input
          type="checkbox"
          checked={item.value}
          onChange={() => checkHandler(item)}
        />
        {item.name}
      </label>
    ) : null
  );

  return <>{items}</>;
};
