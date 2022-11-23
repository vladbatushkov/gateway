import React from 'react';
import { TagInput } from './TagInput';
import { Tags } from './Tags';

export const TagsWithInput: React.FC = () => {

    return (<div>
        <TagInput />
        <Tags />
    </div>);
};