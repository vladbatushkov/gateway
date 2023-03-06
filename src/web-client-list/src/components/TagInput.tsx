import { FC, useState } from "react";
import { useAddTagMutation } from "../graphql/generated/schema";

export const TagInput: FC = () => {
  const [tag, setTag] = useState("");
  const [addTag, { loading, error }] = useAddTagMutation();

  if (error) return <p>Submission error! ${error.message}`</p>;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setTag(val);
  };

  const handleClick = () => {
    if (!tag) {
      return;
    }
    addTag({ variables: { name: tag } });
    setTag("");
  };

  return (
    <div className="panel-block">
      <div className="field has-addons">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="e.g. GraphQL"
            value={tag}
            onChange={handleChange}
          />
        </p>
        <p className="control is-expanded">
          <button
            onClick={handleClick}
            className={`button is-info is-fullwidth ${
              loading ? "is-loading" : ""
            }`}
          >
            Add Tag
          </button>
        </p>
      </div>
    </div>
  );
};
