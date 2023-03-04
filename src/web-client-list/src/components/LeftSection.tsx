import { useEffect, useState } from "react";
import { Tag, useGetTagsQuery } from "../graphql/generated/schema";
import {
  ListOfTagsWithChecks,
  ListOfTagsProps,
  ItemProps,
} from "./ListOfTagsWithChecks";

export const LeftSection = () => {
  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data?.tags as Tag[]);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onChecked = (props: ItemProps) => {
    console.table(props);
  };

  return (
    <div className="block has-background-white">
      <div className="block">
        <div className="field">
          <label className="label">Your GitHub account</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g vladbatushkov"
            />
          </div>
        </div>
      </div>
      <div className="panel is-info">
        <p className="panel-heading">List of Tags</p>
        <div className="panel-block">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input className="input" type="text" placeholder="e.g. GraphQL" />
            </p>
            <p className="control is-expanded">
              <button className="button is-info is-outlined is-fullwidth">
                Add item
              </button>
            </p>
          </div>
        </div>
        <ListOfTagsWithChecks {...({ tags, onChecked } as ListOfTagsProps)} />
      </div>
    </div>
  );
};
