import { FC, useState } from "react";
import { Types, useAppContext } from "../AppContext";
import { useAddTagMutation } from "../graphql/generated/schema";

export const TagInput: FC = () => {
  const { state, dispatch } = useAppContext();
  const [addTag, { loading, error }] = useAddTagMutation();
  const [tagName, setTagName] = useState("");

  if (error) return <p>Submission error! ${error.message}`</p>;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setTagName(name);
  };

  const handleClick = async () => {
    if (!tagName) {
      return;
    }
    await addTag({ variables: { name: tagName } });
    // dispatch({
    //   type: Types.AddTag,
    //   payload: {
    //     name: tagName,
    //   },
    // });
  };

  return (
    <div className="panel-block">
      <div className="field has-addons">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="e.g. GraphQL"
            value={tagName}
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
