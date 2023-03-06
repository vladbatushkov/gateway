import { ListOfTagsWithChecks } from "./ListOfTagsWithChecks";
import { TagInput } from "./TagInput";

export const LeftSection = () => {
  return (
    <div className="block has-background-white">
      <div className="panel is-info">
        <p className="panel-heading">List of Tags</p>
        <TagInput />
        <ListOfTagsWithChecks />
      </div>
    </div>
  );
};
