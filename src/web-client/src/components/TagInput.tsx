import { FC, useState } from 'react';
import { useAddTagMutation } from '../graphql/generated/schema';

export const TagInput: FC = () => {

    const [tag, setTag] = useState("");
    const [addTag, { loading, error }] = useAddTagMutation();

    if (loading) return <p>Submitting...</p>;
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
    };

    return (
        <div>
            <input type="text" value={tag} onChange={handleChange} />
            <button onClick={handleClick}>Submit</button>
        </div>
    );
};