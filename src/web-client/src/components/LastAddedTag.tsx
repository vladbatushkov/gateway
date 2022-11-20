import React, { useCallback, useState } from 'react';
import { useTagAddedSubscription } from '../graphql/generated/schema';

export const LastAddedTag: React.FC = () => {
    const { data, loading } = useTagAddedSubscription();
    return <h4>New tag: {!loading && data?.tagAdded.name}</h4>;
  };