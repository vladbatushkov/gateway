import React from 'react';
import { AddTag } from './AddTag';
import { Tags } from './Tags';

export const TagsWithInput: React.FC = () => {

    return (<div>
        <AddTag />
        <Tags />
    </div>);
};