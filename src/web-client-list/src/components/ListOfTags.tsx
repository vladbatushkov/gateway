import { FC, useEffect, useState } from "react";
import { Tag } from "../graphql/generated/schema";

export interface ItemProps {
  name: string;
  value: boolean;
}

export interface ListOfTagsProps {
  tags: Tag[];
}

export const ListOfTags: FC<ListOfTagsProps> = ({ tags }) => {
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

  const items = checks?.map((item) =>
    item ? (
      <label key={item.name} className="checkbox panel-block is-active">
        {item.name}
      </label>
    ) : null
  );

  return <>{items}</>;
};
